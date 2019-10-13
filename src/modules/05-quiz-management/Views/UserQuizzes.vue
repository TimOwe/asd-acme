<template>
    <v-container grid-list-md>
        <div v-if="render === 'quizCatalogue'"> <!--Displays if render is equal to quiCatalogue-->
            <v-card>
                <v-toolbar color="primary" dark flat>
                    <v-container grid-list-md>
                        <v-layout pt-3 justify-center align-center>
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
                                <v-col>
                                    <v-layout pt-2 justify-center align-center justify-end align-end>
                                        <v-select v-model="category" :items="categories" item-text="category" item-value="value" placeholder="Filter Category" prepend-inner-icon="mdi-menu-down" append-icon="mdi-close" @click:append="resetCategory()" return-object single-line></v-select>
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
        props: {
            activeUser: Object
        },
        // grabbing all data on page render
        beforeMount: function(){
            this.userKey = this.$route.params.id;//retrieves the key of the user from the route
            this.getQuizzes();//creates list of quizzes
            this.setUser();//sets the user to find name
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
            resetCategory: function() {//Resets the search term property to nothing, removing all criteria
                this.category = { category: '', value: '' };
            },
            toProfile: function() {
                this.$router.go(-1);
            },
            setUser() {
                this.$db.ref('/Users/').child(this.userKey).once('value', (snap) => {//finds the user in the database with the key passed from the quiz owner id property
                    this.thisUser = snap.val();//sets user to firebase object
                    this.userFullName = this.thisUser.fname +" "+ this.thisUser.lname;//sets full name property to combination of first and last name values from firebase object
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
            category: { category: '', value: '' },
            categories: [
                { category: 'Animals', value: 'animals' },
                { category: 'Business', value: 'business' },
                { category: 'Cars', value: 'cars' },
                { category: 'Country', value: 'country' },
                { category: 'Culture', value: 'culture' },
                { category: 'Economics', value: 'economics' },
                { category: 'Environment', value: 'environment' },
                { category: 'Film', value: 'film' },
                { category: 'Food', value: 'food' },
                { category: 'General Knowledge', value: 'generalknowledge' },
                { category: 'History', value: 'history' },
                { category: 'Literature', value: 'literature' },
                { category: 'Math', value: 'math' },
                { category: 'Music', value: 'music' },
                { category: 'Politics', value: 'politics' },
                { category: 'Psychology', value: 'psychology' },
                { category: 'Science', value: 'science' },
                { category: 'Sport', value: 'sport' },
                { category: 'Technology', value: 'technology' },
                { category: 'Television', value: 'television' },
                { category: 'Video Games', value: 'videogames' },
            ],

            data(){
                return {
                    quizs: [],
                }
            },
        }),

        computed: {
            filteredList() {
                return this.quizs.filter(quiz => {//filters quiz list
                    if (this.category.value !=='' && this.searchTerm !==''){//if a search term and category are selected
                        return quiz.category.toLowerCase().includes(this.category.value.toLowerCase()) && quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//adds quiz if search term matches any part of its title and if category  matches the category field of the quiz
                    }
                    else if (this.category.value !==''){//if just a category is selected
                        return quiz.category.toLowerCase().includes(this.category.value.toLowerCase())//adds quiz if category  matches the category field of the quiz
                    }
                    else if (this.searchTerm !==''&& this.category.value =='') {//if just a search term is entered
                        return quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//adds quiz if search term matches any part of its title
                    }
                    return quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//renders full list
                })
            }
        }
    }

</script>

<style scoped>

</style>