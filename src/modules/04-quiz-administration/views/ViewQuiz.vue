<template>
    <v-flex>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs3 v-for="quiz in quizs" :key="quiz.key">
                    <v-card>
                        <v-card-title>{{quiz.quiz_title}}</v-card-title>
                        <button-card :img="quiz.img" ></button-card>
                        <v-card-actions>
                            <v-btn depressed large color="red" class="white--text" @click="deleteQuiz(quiz.key)">Delete</v-btn>
                            <v-btn large color="primary" @click="handleShowLogs(quiz.key)">View Logs</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>
    import buttonCard from '../components/button-card'

    export default {
        beforeMount(){
            this.$db.ref('/Quizs').on('value', (snap) => {
                this.quizs = [];
                snap.forEach(quiz => {
                    var quizObj = quiz.val();
                    quizObj.key = quiz.key;
                    this.quizs.push(quizObj);
                })
            })

        },
        components:{buttonCard},
        data(){
            return {
                quizs: []
            }
        },
        methods: {
            deleteQuiz(quizKey) {
                this.$db.ref('/Quizs/'+quizKey).remove();
                // location.reload();
            }
        },



    }
</script>