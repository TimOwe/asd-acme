<template>
        <v-row>
            <v-col>
                <v-card class="mx-auto"
                        max-width="90%">
                    <v-toolbar flat>
                        <v-btn icon>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title class="text-center, display-2">Quizzes</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-container fluid>
                        <v-row>
                            <v-col v-for="quiz in quizs" cols="4">
                                <quiz-card @click.native="showDialog(quiz)" :img="quiz.img" :title="quiz.quiz_title" :description="quiz.description" :owner="quiz.owner_id" :questions="quiz.questions"></quiz-card>

                            </v-col>
                        </v-row>
                        <v-btn color="primary" @click="addTestData()">Add Test Quizzes</v-btn>
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
            addTestData(){
                this.testData.forEach(entry => {
                    this.$db.ref('/Quizs').push(entry);
                });
            },
            addnewData(){
                //this.$refs.form.forEach(entry => {
                    this.$db.ref('/Quizs').push(this.$refs.form);

            }

        },
        // dummy data
        data(){
            return {
                testData: [
                {
                    quiz_title: 'Ancient Greece Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
                    description: "A fun Quiz!",
                    owner_id: 1212,
                    flex: 12
                },
                {
                    quiz_title: 'Ancient Egypt Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    description: "A decent Quiz!",
                    owner_id: 3212,
                    flex: 6
                },
                {
                    quiz_title: 'Ancient China Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                    description: "A not so fun Quiz!",
                    owner_id: 512,
                    flex: 6
                },

            ],
                quizs: [],

            }
        },
        props: {

        }

    }

</script>

<style scoped>

</style>