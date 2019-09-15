<template>
    <div>
        <v-layout justify-center fill-height class="pb-12 pt-12">
            <v-card dark elevation="12" width=1000 height="500">
                <v-card-title class="justify-center">{{quiz.quiz_title}} - Leaderboard</v-card-title>
                <v-card-text>
                    <v-layout justify-center class="subtitle-1 pb-10">{{quiz.description}}</v-layout>
                    <v-simple-table fixed>
                        <thead>
                        <tr>
                            <th class="text-center">First Name</th>
                            <th class="text-center">Date</th>
                            <th class="text-center">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="result in results">
                            <td class="text-center">{{ result.fname }}</td>
                            <td class="text-center">{{new Date(result.time_start).toDateString() }}</td>
                            <td class="text-center">{{ result.score }}%</td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn text color="blue">Order Ascending</v-btn>
                        <v-btn text color="blue">Order Descending</v-btn>
                        <v-btn text color="green">Play Again</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-layout>
        <v-card class="mt-4 mx-auto pt-12 mb-12" max-width="800">
            <v-sheet class="v-sheet--offset mx-auto" color="blue" elevation="12" max-width="calc(100% - 32px)">
                <v-sparkline
                        :labels="labels"
                        :value="value"
                        color="white"
                        line-width="2"
                        padding="16"
                ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
                <div class="title font-weight-light mb-2">Past Attempts</div>
                <div class="subheading font-weight-light grey--text">Last Quiz Performance</div>
                <v-divider class="my-2"></v-divider>
                <v-icon class="mr-2" small>mdi-clock</v-icon><span class="caption grey--text font-weight-light">last attempt 26 minutes ago</span>
            </v-card-text>
        </v-card>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: "Leaderboard",
        async beforeMount(){
            this.loading=true;
            var quizId = this.$route.params.id;
            this.results = await this.getResultsArrayFromQuiz(quizId);
            this.$db.ref('/Quizs/').child(quizId).once('value', (snap) => {
                this.quiz = snap.val();
                this.loading=false;
            });
        },
        data(){
            return {
                labels: [
                    'Attempt 1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                ],
                value: [
                    200,
                    675,
                    410,
                    390,
                    610,
                    460,
                    250,
                    240,
                ],
                results: [],
                quiz: {},
                loading: false
            }
        },
        methods:{
            getResultsArrayFromQuiz(quizKey){
                var results = [];
                return new Promise((resolve) => {
                    this.$db.ref('/Users').once('value', (snap) => {
                        snap.forEach(user => {
                            var userObj = user.val();
                            if(!!userObj.results){
                                var user_results = Object.values(userObj.results);
                                user_results.forEach(result => {
                                    if(result.quizId === quizKey){
                                        result.userKey = user.key;
                                        result.fname = userObj.fname;
                                        results.push(result);
                                    }
                                });
                            }
                        });
                        resolve(results);
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>