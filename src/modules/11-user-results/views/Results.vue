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
                getQuizs() {
                    this.$db.ref('/Quizs').on('value', (snap) => {
                        this.quizs = [];
                        snap.forEach(entry => {
                            var entryObj = entry.val();
                            entryObj.key = entry.key;
                            this.quizs.push(entryObj);
                        });
                    });
                }
        },
        data: () => ({
            quizs:[],
            activeResults: {},
            dialog: false
        }),
    }
</script>
