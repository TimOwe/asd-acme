<template>
    <v-card class="mx-auto" elevation='12' max-width="600">
        <v-container>
        <v-card-title>
            <v-btn icon class="align-self-start" size="28"><v-icon>mdi-arrow-right-thick</v-icon></v-btn>
            User Results
        </v-card-title>

        <v-sheet color="transparent">
            <v-sparkline :key="String(userScores)" :smooth="16" :gradient="['#6e8bf7', '#d79aff', '#1feaea']" :line-width="3" :value="userScores" :labels="userScores" auto-draw stroke-linecap="round"></v-sparkline>
        </v-sheet>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "UserSessionResults",
        async beforeMount(){
            this.loading = true;
            this.userScores = [1,2,3].map(e => Math.round(Math.random()*1000))
        },
        computed:{
           // async userScores(){
                // return await this.getScoresUserQuiz(this.userKey,this.quizKey);
            // }
        },
        props: {
            userKey: String,
            quizKey: String
        },
        data(){
            return {
                userScores: [],
                loading: false
            }
        },
        methods: {
            getScoresUserQuiz(userkey ,quizkey){
                return new Promise((resolve) => {
                    var scores = [];
                    this.$db.ref(`/Users/${userkey}`).once('value', snap => {
                        var results = snap.child('results');
                        results = Object.values(results.val());
                        for(let i = 0; i<results.length;i++){
                            var result = results[i];
                            if(result.quizId === quizkey){
                                var questions = result.questions;
                                questions.forEach(question => {
                                    scores.push(question.score);
                                });
                                break;
                            }
                        }
                        this.loading = false;
                        resolve(scores);
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>