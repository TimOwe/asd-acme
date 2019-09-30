<template>
    <v-container grid-list-md>
        <div v-if="render === 'quizCatalogue'"> <!--Displays if render is equal to quiCatalogue-->
            <v-card>
                <v-toolbar color="primary" dark flat>
                        <v-container grid-list-md>
                            <v-layout justify-center align-center>
                                <v-row>
                                    <v-col>
                                        <v-layout justify-center align-center justify-start align-start>
                                            <v-btn icon @click="toProfile"><v-icon>mdi-arrow-left</v-icon></v-btn> <v-layout pb-3 pl-2 class="text-center, headline">{{userFullName}}'s Quizzes</v-layout>
                                        </v-layout>
                                    </v-col>
                                    <v-col>
                                        <v-layout pt-2 justify-center align-center justify-end align-end>
                                            <v-text-field hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                                        </v-layout>
                                    </v-col>
                                </v-row>
                            </v-layout>
                        </v-container>
                </v-toolbar>

                <v-container grid-list-md>
                    <v-container grid-list-md>
                        <v-row>
                            <v-col v-for="quiz in filteredList" :key="quiz.key" cols="4"><!--Generates a quiz card for every quiz object in the database-->
                                <quiz-card :quiz="quiz" ></quiz-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-card>
        </div>
        <v-footer class="mt-12"></v-footer>
    </v-container>
</template>



<script>

    import quizCard from "../Components/quiz-card";
    export default {
        name: "QuizCatalogue",
        components: {quizCard},

        // grabbing all data on page render
        beforeMount: function(){
            this.userKey = this.$route.params.id;
            this.getQuizzes();
            this.setUser();
        },

        methods:{
            // getting snapshot of data from firebase
            getQuizzes: function(){
                this.$db.ref('/Quizs').on('value', (snap) => {
                    // clear current results array each time method is called
                    this.quizs = [];
                    // convert firebase data entries into json
                    snap.forEach(entry => {
                        // Assignes variable to firebase object
                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        // Checks if firebase object contains the owner ID of the currently logged in user via cookie
                        if(entry.val().owner_id===this.userKey) {
                            // If the owner_id's are the same the quiz is pushed to the list
                            this.quizs.push(entryObj);
                        }
                    });
                });
            },
            resetSearch: function() {//Resets the search term property to nothing, removing all criteria
                this.searchTerm = '';
            },
            toProfile: function() {
                this.$router.go(-1);
            },
            setUser() {
                this.$db.ref('/Users/').child(this.userKey).once('value', (snap) => {
                    this.thisUser = snap.val();
                    this.userFullName = this.thisUser.fname +" "+ this.thisUser.lname;
                });
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
            userKey: "",
            userFullName: "",
            thisUser: "",


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