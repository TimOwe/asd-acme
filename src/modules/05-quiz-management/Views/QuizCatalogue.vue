<template>
    <v-container grid-list-md>
                <v-card>
                    <v-toolbar color="primary" dark flat>
                        <v-container grid-list-md>
                            <v-layout justify-center align-center>
                                <v-row>
                                    <v-col>
                                        <v-layout justify-start align-start>
                                            <v-layout pl-5 class="text-center, display-1">Quizzes</v-layout>
                                        </v-layout>
                                    </v-col >
                                    <v-col>
                                        <v-layout justify-center align-center>
                                            <v-text-field hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                                        </v-layout>
                                    </v-col>
                                    <v-col>
                                        <v-layout justify-end align-end>
                                            <v-btn  to="/quiz-creator" color="green" v-if="!!$cookies.isKey('user')">Create Quiz<v-icon right color="white">mdi-plus</v-icon></v-btn>
                                        </v-layout>
                                    </v-col>

                                </v-row>
                            </v-layout>
                        </v-container>
                    </v-toolbar>

            <v-container>
                <v-row>
                    <v-col v-for="quiz in filteredList" :key="quiz.key" cols="12" sm="4"><!--Generates a quiz card for every quiz object in the database-->
                        <quiz-card :quiz="quiz" ></quiz-card>
                    </v-col>
                </v-row>
            </v-container>
                    <v-footer class="mt-12"></v-footer>


        </v-card>
    </v-container>

</template>



<script>

    import quizCard from "../Components/quiz-card";
    export default {
        name: "QuizCatalogue",
        components: {quizCard},

        // grabbing all data on page render
        async beforeMount(){
            this.getQuizzes();
        },

        methods:{
            // getting snapshot of data from firebase
            async getQuizzes(){
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
            resetSearch: function() {//Resets the search term property to nothing, removing all criteria
                this.searchTerm = '';
            },

        },
        //Initialised data
        data: () => ({
            render: "quizCatalogue",
            edit: false,
            deleteConfirm: false,
            loading: false,
            quizs: [],
            searchTerm: '',

            data(){
                return {
                    quizs: [],
                }
            },
        }),
        props: {
            activeUser: Object
        },
        computed: {
            filteredList() {
                return this.quizs.filter(quiz => {
                    return quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())
                })
            }
        }

    }

</script>

<style scoped>

</style>