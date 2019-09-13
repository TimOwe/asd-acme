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
                            <th class="text-center">Rank</th>
                            <th class="text-center">First Name</th>
                            <th class="text-center">Date</th>
                            <th class="text-center">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="result in results">
                            <td class="text-center">{{ result.rank }}</td>
                            <td class="text-center">{{ result.fname }}</td>
                            <td class="text-center">{{ new Date(result.time_start).toDateString() }}</td>
                            <td class="text-center">{{ result.score }}%</td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn text color="blue" @click="sortResults('asc')">Order Ascending</v-btn>
                        <v-btn text color="blue" @click="sortResults('desc')">Order Descending</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Leaderboard",
        async beforeMount() {
            var quizId = this.$route.params.id;
            this.$db.ref('/Quizs/').child(quizId).once('value', (snap) => {
                this.quiz = snap.val();
            });
            this.results = await this.getResultsArrayFromQuiz(quizId);
        },
        data() {
            return {
                results: [],
                quiz: {}
            }
        },
        methods: {
            getResultsArrayFromQuiz(quizKey) {
                var results = [];
                return new Promise((resolve) => {
                    this.$db.ref('/Users').once('value', (snap) => {
                        snap.forEach(user => {
                            var userObj = user.val();
                            if (!!userObj.results) {
                                var user_results = Object.values(userObj.results);
                                user_results.forEach(result => {
                                    if (result.quizId === quizKey) {
                                        result.userKey = user.key;
                                        result.fname = userObj.fname;
                                        results.push(result);
                                    }
                                    this.results = results.sort((a,b) => b.score - a.score)
                                    for(var i=0; i<this.results.length;i++){
                                        this.results[i].rank = i+1;
                                    }
                                });
                            }
                        });
                        resolve(results);
                    })
                })
            },
            sortResults(type) {
                return type === 'asc' ? this.results.sort((a, b) => b.score - a.score) : this.results.sort((a, b) => a.score - b.score);
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