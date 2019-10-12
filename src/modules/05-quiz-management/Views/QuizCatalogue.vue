<template>
    <v-container grid-list-md>
        <v-card>
            <v-toolbar color="primary" dark flat>
                <v-container grid-list-md>
                    <v-layout pt-5 justify-center align-center>
                        <v-row>
                            <v-col>
                                <v-layout justify-start align-start>
                                    <v-layout pl-5 class="text-center, display-1">Quizzes</v-layout>
                                </v-layout>
                            </v-col>
                            <v-col>
                                <v-layout justify-center align-center>
                                    <v-text-field hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                                </v-layout>
                            </v-col>
                            <v-col>
                                <v-layout justify-center align-center>
                                    <v-select v-model="category" :items="categories" item-text="category" item-value="value" placeholder="Filter Category" prepend-inner-icon="mdi-menu-down" append-icon="mdi-close" @click:append="resetCategory()" return-object single-line></v-select>
                                </v-layout>
                            </v-col>
                            <v-col>
                                <v-layout justify-end align-end>
                                    <v-btn @click="toCreator" color="green">Create Quiz<v-icon right color="white">mdi-plus</v-icon></v-btn>
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

        <v-dialog width=350 v-model="creatorAlert">
            <v-card>

                <v-card-title>
                    <v-layout justify-center align-center>Woah Slow Down!</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">You must be logged in to create a quiz, log in below.</v-card-text>
                <v-card-actions>
                    <v-layout justify-center align-center>
                        <v-btn color="white" @click="creatorAlert = false">Back</v-btn>
                        <v-btn color="primary" to="/login">Log In</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            if(this.$route.params.inCategory!==undefined){
                this.setCategory(this.$route.params.inCategory);
            }
        },
        methods:{
            // getting snapshot of data from firebase
            async getQuizzes(){
                this.$db.ref('/Quizs').on('value', (snap) => {
                    // clear current results array each time method is called
                    this.quizs = [];
                    // convert firebase data entries into json
                    snap.forEach(entry => {
                        //this.$db.ref('/Quizs/'+entry.key).update({"category": 'generalknowledge'})

                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        // push firebase data into results array
                        this.quizs.push(entryObj);
                    });
                    // sort results by ascending order of score
                });
            },
            setCategory: function(category){//As the image is locally defined as an object, but defined in firebase by its url, it will need to be matched to the iobject for it to load into the select component
                for(var i=0;i<this.categories.length;i++) {//Searches the local list
                    if (this.categories[i].value === category) {//if the quiz url recieved as a prop equals the url of the local object, it sets the local object to be the result in the select component
                        this.category = this.categories[i];
                    }
                }
            },
            toCreator: function() {
                if(!(this.$cookies.isKey('user'))){//if the user is logged in
                    this.creatorAlert=true;//if user not logged in, activate the host alert dialog
                }
                else this.$router.push({ name: 'quiz-creator'});//if user is logged in, route to host and send the quiz title as a parameter
            },
            resetSearch: function() {//Resets the search term property to nothing, removing all criteria
                this.searchTerm = '';
            },
            resetCategory: function() {//Resets the search term property to nothing, removing all criteria
                this.category = { category: '', value: '' };
            },
        },
        //Initialised data
        data: () => ({
            render: "quizCatalogue",
            edit: false,
            deleteConfirm: false,
            creatorAlert: false,
            loading: false,
            quizs: [],
            searchTerm: '',
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
        props: {
            activeUser: Object
        },
        computed: {//list for search functionality
            filteredList() {
                return this.quizs.filter(quiz => {//filters quiz list
                    if (this.category.value !=='' && this.searchTerm !==''){
                        return quiz.category.toLowerCase().includes(this.category.value.toLowerCase()) && quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//adds quiz if search term matches any part of its title
                    }
                    else if (this.category.value !==''){
                        return quiz.category.toLowerCase().includes(this.category.value.toLowerCase())//adds quiz if search term matches any part of its title
                    }
                    else if (this.searchTerm !==''&& this.category.value =='') {
                        return quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//adds quiz if search term matches any part of its title
                    }
                    return quiz.quiz_title.toLowerCase().includes(this.searchTerm.toLowerCase())//adds quiz if search term matches any part of its title
                })
            }
        }
    }

</script>

<style scoped>

</style>