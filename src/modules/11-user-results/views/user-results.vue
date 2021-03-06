<template>
    <div>
        <v-container grid-list-md>
            <v-layout justify-center class="headline pt-12">
                <v-btn style="margin-top: -1%;" icon @click="handleBack">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                {{activeUser.fname}}'s Results
            </v-layout>
            <v-layout row wrap class="mt-5">
                <v-flex xs4 v-for="(attempt,ind) in attempts" :key="JSON.stringify(attempt)">
                    <v-card height="350">
                        <v-img :eager="imageload" :src="attempt.img" class="white--text" height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                        <v-card-title class="align-end fill-height">
                            Quiz Result {{ind + 1}}: {{attempt.quiz_title}}
                        </v-card-title>
                        </v-img>
                        <v-card-text>
                            Score: {{attempt.score}} <br>
                            Time: {{new Date(attempt.time_start).toString()}}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="showAttemptData(attempt)" absolute bottom right depressed color="blue"><v-icon color="white">mdi-eye</v-icon></v-btn>
                            <v-btn @click="showAttemptByQuiz(attempt)" absolute bottom left depressed color="purple"><v-icon color="white">mdi-watch</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-alert type="warning" v-if="showError">
                This user has no results.
            </v-alert>
        </v-container>

        <v-dialog v-model="attemptData">
            <v-card>
                <v-card-text>
                    Total Score: {{this.currentAttempt.score}} <br>
                    Time Start: {{new Date(currentAttempt.time_start).toString()}}
                    <v-divider class="mt-4 mb-5"></v-divider>
                        <v-simple-table fixed>
                            <thead>
                            <tr>
                                <th class="text-center">Question</th>
                                <th class="text-center">Correct</th>
                                <th class="text-center">Selected</th>
                                <th class="text-center">Points</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="question in currentAttempt.questions"">
                                <td class="text-left">{{ question.q }}</td>
                                <td class="text-center">{{ question.a[question.c] }}</td>
                                <td class="text-center">{{ !question.a[question.selected] ? 'Not Selected' : question.a[question.selected]}}</td>
                                <td class="text-center">{{ question.a[question.c]===question.a[question.selected] ? question.score : '0' }}</td>
                            </tr>
                            </tbody>
                        </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn class="white--text" color="red" depressed @click="attemptData = false">Close</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="800" v-model="chartDataQuiz">
            <v-card height="400">
                <v-container class="pa-12">
                    <v-layout>
                    <v-btn icon @click="chartDataQuiz = false">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-card-title>All Attempts For {{chartData.title}}</v-card-title>
                    </v-layout>
                    <v-layout v-if="chartData.data.length > 1" justify-center>
                            <!--<trend :data="chartData.data" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend>-->
                        <TrendChart
                                padding="20"
                                height="500"
                                width="700"
                                :datasets="[{data: chartData.data,smooth: true,fill: true}]"
                                :grid="{verticalLines: true, horizontalLines: true}"
                                :labels="{ xLabels: chartData.time, yLabels: 5 }" :min="0">
                        </TrendChart>
                    </v-layout>
                    <v-layout v-else justify-center class="mt-12">
                        <v-layout justify-center class="headline mt-12">Not Enough Data For Chart</v-layout>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>
    export default {
        name: "user-results",
        // gets user data for the currently viewed user by their userKey in the route
        beforeMount() {
            this.loading = true;
            var userKey = this.$route.params.id;
            this.$db.ref(`/Users/${userKey}`).once('value', (snap) => {
                this.activeUser = snap.val();
                if (!snap.val().results) {
                    this.showError = true;
                    return;
                }
                // gets the title of each of their quiz results
                this.attempts = Object.values(this.activeUser.results);
                this.attempts.forEach(attempt => {
                    this.getQuizName(attempt.quizId).then(data => {
                        attempt.quiz_title = data;
                    })
                });
                // gets the image of each of their quiz results
                this.attempts = Object.values(this.activeUser.results);
                this.attempts.forEach(attempt => {
                    this.getQuizImg(attempt.quizId).then(data => {
                        attempt.img = data;
                    })
                });
            });
            setTimeout(() => {
                this.loading = false;
            }, 500)
        },
        mounted(){
            setTimeout(() => this.imageload = true,200);
        },
        methods: {
            // shows the quiz result when results button is pressed
            showAttemptData(attempt) {
                this.currentAttempt = attempt;
                this.attemptData = true;
            },
            // shows a score graph for a set of quiz attempts when button is pressed
            showAttemptByQuiz(attempt){
                this.chartData = {
                    title: '',
                    data: [],
                    time: [],
                };
                // gets quiz title, score for each attempt of that quiz, time of each attempt to populate the graph
                this.chartData.title = attempt.quiz_title;
               var filteredList = this.attempts.filter(e => e.quiz_title === this.chartData.title);
               filteredList.sort((a,b) =>  a.time_end - b.time_end);
               filteredList.forEach(attempt => {
                   this.chartData.data.push(attempt.score);
                   this.chartData.time.push(new Date(attempt.time_end).toDateString())
               });
               console.log(this.chartData);
               this.chartDataQuiz = true;
            },
            // back button functionality
            handleBack(){
                this.$router.go(-1);
            },
            async getQuizName(id){
               var template = await this.$db.ref(`/Quizs/${id}`).once('value');
               var title = template.val().quiz_title;
               return title;
            },
            async getQuizImg(id){
                var template = await this.$db.ref(`/Quizs/${id}`).once('value');
                var img = template.val().img;
                return img;
            }
        },
        data(){
            return {
                activeUser: {},
                attempts: [],
                chartData: {
                    title: '',
                    data: [],
                    time: [],
                },
                imageload: false,
                currentAttempt: {},
                attemptData: false,
                loading: false,
                showError: false,
                img: '',
                chartDataQuiz: false
            }
        }
    }

</script>

<style scoped>

</style>