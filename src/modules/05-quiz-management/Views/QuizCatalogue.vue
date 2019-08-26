<template>
        <v-row>
            <v-col>
                <v-card class="mx-auto"
                        max-width="90%">
                    <v-toolbar flat>
                        <v-btn icon>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title class="text-center, display-1">Quizzes</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn to="/quiz-creator" color="green">Create Quiz</v-btn>
                    </v-toolbar>
                    <v-container fluid>
                        <v-row>
                            <v-col v-for="quiz in quizs" :key="quiz.key" cols="4">
                                <quiz-card v-on:refresh="refresh" :quiz="quiz" :img="quiz.img" :title="quiz.quiz_title" :description="quiz.description" :owner="quiz.owner_id" :questions="quiz.questions" ></quiz-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-footer class="mt-12"></v-footer>
                </v-card>
            </v-col>
        </v-row>

</template>



<script>

    import QuizCard from "../Components/quiz-card";
    export default {
        name: "QuizCatalogue",
        components: {QuizCard},


        // grabbing all data on page render
        beforeMount(){
            this.getQuizzes();
        },
        quizs: [],


        methods:{
            // getting snapshot of data from firebase
            getQuizzes(){
                this.$db.ref('/Quizs').on('value', (snap) => {
                    // clear current results array each time method is called
                    this.quizs = [];
                    // convert firebase data entries into json
                    snap.forEach(entry => {
                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        // push firebase data into results array
                        this.quizs.push(entryObj);
                    });
                    // sort results by ascending order of score
                });
            },
            // function to push dummy data to firebase
            refresh: function () {
                this.getQuizzes();
            },
        },
        // dummy data
        data(){
            return {
                quizs: [],
            }
        },
        props: {

        }

    }

</script>

<style scoped>

</style>