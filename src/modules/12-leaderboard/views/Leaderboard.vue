<template>
    <div>
        <v-layout justify-center fill-height class="pb-12 pt-12">
            <v-card dark elevation="12" width=1000>
                <v-card-title class="justify-center">{{quiz.quiz_title}} - Leaderboard</v-card-title>
                <v-card-text>
                    <v-layout justify-center class="subtitle-1 pb-10">{{quiz.description}}</v-layout>
                    <v-card-actions>
                        <v-layout justify-center>
                            <v-btn text color="blue" @click="sortResults('asc')">Order Ascending</v-btn>
                            <v-btn text color="blue" @click="sortResults('desc')">Order Descending</v-btn>
                        </v-layout>
                    </v-card-actions>
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
                            <td class="text-center">
                                <v-btn style="text-transform: none; font-weight: normal" @click="handleNameClick(result.userKey)" text >{{ result.fname }}</v-btn>
                            </td>
                            <td class="text-center">{{ new Date(result.time_start).toDateString() }}</td>
                            <td class="text-center">{{ result.score }}</td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Leaderboard",
        // gets the quizId from the route, then gets that quiz from database
        async beforeMount() {
            var quizId = this.$route.params.id;
            this.$db.ref('/Quizs/').child(quizId).once('value', (snap) => {
                this.quiz = snap.val();
            });
            // passes the quizID into getResultsArrayFromQuiz method
            this.results = await this.getResultsArrayFromQuiz(quizId);
        },
        data() {
            return {
                results: [],
                quiz: {}
            }
        },
        methods: {
            handleNameClick(key){
                this.$router.push({path: `/profile/${key}`})
            },
            getResultsArrayFromQuiz(quizKey) {
                var results = [];
                return new Promise((resolve) => {
                    // gets users from database
                    this.$db.ref('/Users').once('value', (snap) => {
                        snap.forEach(user => {
                            var userObj = user.val();
                            // checks each user in the database for a results document, stores users with results if found
                            if (!!userObj.results) {
                                var user_results = Object.values(userObj.results);
                                // checks through user results to see if they have results for the passed quizid
                                // if they do, store their userID, firstname and push their result to a results array
                                user_results.forEach(result => {
                                    if (result.quizId === quizKey) {
                                        result.userKey = user.key;
                                        result.fname = userObj.fname;
                                        results.push(result);
                                    }
                                    this.results = results.sort((a,b) => b.score - a.score);
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
            // sort results by descending or ascending
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