<template>
    <div>
        <v-container grid-list-md>
            <v-layout justify-center class="headline pt-12">
                <v-btn style="margin-top: -1%;" icon @click="handleBack">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                {{activeUser.fname}}'s Results
            </v-layout>
            <v-layout row wrap class="mt-10">
                <v-flex xs3 class="mb-10" v-for="(attempt,ind) in attempts">
                    <v-card height="220" width="450">
                        <v-card-title>
                            Quiz Result {{ind + 1}}: {{attempt.quiz_title}}
                        </v-card-title>
                        <v-card-text>
                            Score: {{attempt.score}} <br>
                            Time: {{new Date(attempt.time_start).toString()}}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="showAttemptData(attempt)" fab absolute bottom right color="blue"><v-icon color="white">mdi-eye</v-icon></v-btn>
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
                            <tr v-for="question in currentAttempt.questions">
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
                        <v-btn class="white--text" color="red" raised @click="attemptData = false">Close</v-btn>
                    </v-layout>
                </v-card-actions>
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
        beforeMount() {
            this.loading = true;
            var userKey = this.$route.params.id;
            this.$db.ref(`/Users/${userKey}`).once('value', (snap) => {
                this.activeUser = snap.val();
                if (!snap.val().results) {
                    this.showError = true;
                    return;
                }
                this.attempts = Object.values(this.activeUser.results);
                this.attempts.forEach(attempt => {
                    this.getQuizName(attempt.quizId).then(data => {
                        attempt.quiz_title = data;
                    })
                });
            });
            setTimeout(() => {
                this.loading = false;
            }, 500)
        },
        methods: {
            showAttemptData(attempt) {
                this.currentAttempt = attempt;
                this.attemptData = true;
            },
            handleBack(){
                this.$router.go(-1);
            },
            async getQuizName(id){
               var template = await this.$db.ref(`/Quizs/${id}`).once('value');
               var title = template.val().quiz_title;
               return title;
            }
        },
        data(){
            return {
                activeUser: {},
                attempts: {},
                currentAttempt: {},
                attemptData: false,
                loading: false,
                showError: false
            }
        }
    }

</script>

<style scoped>

</style>