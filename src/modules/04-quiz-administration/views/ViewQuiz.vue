<template>
    <v-flex>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs3 v-for="quiz in quizs" :key="quiz.key">
                    <v-card>
                        <v-card-title>{{quiz.quiz_title}}</v-card-title>
                        <button-card :img="quiz.img" ></button-card>
                        <v-card-actions>
                        <v-btn depressed large color="red" class="white--text" @click="deleteUser(quizs.key)">Delete</v-btn>
                        <v-btn large color="primary" @click="handleShowLogs(quizs.key)">View Logs</v-btn>
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
        data(){return {
                quizs: [{
                    name: 'Quiz1',
                    img: 'https://swoonproduction.s3.amazonaws.com/media/images/quiz_xEHRxwV.2e16d0ba.fill-620x413.jpg',
                    description: 'fsafaasfsf'
                },{
                    name: 'Quiz2',
                    img: 'https://swoonproduction.s3.amazonaws.com/media/images/quiz_xEHRxwV.2e16d0ba.fill-620x413.jpg',
                    description: 'mattttttttttt'
                }]
            }
        },
        methods: {

        }
    }
</script>