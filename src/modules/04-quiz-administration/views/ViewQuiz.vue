<template>
    <div>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs3 v-for="quiz in quizs" :key="quiz.key">
                    <v-card>
                        <v-card-title>{{quiz.quiz_title}}</v-card-title>
                        <button-card :img="quiz.img" ></button-card>
                        <v-card-actions>
                            <v-btn depressed large color="red" class="white--text" @click="deleteQuiz(quiz.key)">Delete</v-btn>
                            <v-btn large color="primary" @click="handleMetaDialog(quiz)">View Logs</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog width="350" v-model="metaDialog">
            <v-card>
                <v-container>
                    <v-layout justify-center class="headline">Quiz Metadata</v-layout>
                    <v-card-text>
                        ID: {{activeQuiz.key}} <br>
                        Description: {{activeQuiz.description}}<br>
                        Date Created: {{activeQuiz.time_created}}<br>
                        Score Decay: {{activeQuiz.score_decay}}<br>
                       <span v-if="!!activeQuiz.questions"> Num Questions: {{activeQuiz.questions.length}}</span>
                    </v-card-text>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
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
                quizs: [],
                metaDialog: false,
                activeQuiz: {},
            }
        },
        methods: {
            deleteQuiz(quizKey) {
                this.$db.ref('/Quizs/'+quizKey).remove();
            },
            handleMetaDialog(quiz){
                this.activeQuiz = quiz;
                this.metaDialog = true;
            }
        },



    }
</script>