<template>
    <div>
        <v-layout justify-center align-center class="headline">View Results</v-layout>

        <v-flex>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs4 v-for="quiz in quizs" :key="quiz.name">
                        <button-card @click.native="showDialog(quiz.results)" :img="quiz.img" :text="quiz.name"></button-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <results-card :results="activeResults"></results-card>
        </v-dialog>

    </div>
</template>

<script>
    import ButtonCard from "../components/button-card";
    import ResultsCard from "../components/results-card"
    export default {
        components: {ButtonCard, ResultsCard},
        beforeMount(){
            this.quizs = this.getQuizs()
        },
        methods:{
            showDialog(results){
                this.activeResults = results;
                this.dialog = true;
            },
            getQuizs(){
                return [{
                    name: 'Quiz1',
                    img: 'https://images.pexels.com/photos/842339/pexels-photo-842339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    date: new Date(),
                    results: [
                        {q: "question 1", a: true},
                        {q: "question 2", a: true},
                        {q: "question 3", a: true}
                    ]
                },
                    {
                        name: 'Quiz2',
                        img: 'https://images.pexels.com/photos/842339/pexels-photo-842339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                        date: new Date(),
                        results: [
                            {q: "question 1", a: true},
                            {q: "question 2", a: true},
                            {q: "question 3", a: true}
                        ]
                    }]
            }
        },
        data: () => ({
            quizs:[],
            activeResults: {},
            dialog: false
        }),
    }
</script>
