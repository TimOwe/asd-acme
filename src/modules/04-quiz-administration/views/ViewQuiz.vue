<template>
    <v-flex>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs3 v-for="quiz in quizs" :key="quiz.key">
                    <button-card :img="quiz.img" :text="quiz.name"></button-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>

    import buttonCard from '../components/button-card'

    export default {
        components:{buttonCard},
        data(){
            return {
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