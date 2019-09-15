<template>
    <v-container grid-list-md>
        <div v-if="render === 'quizCatalogue'"> <!--Displays if render is equal to quiCatalogue-->
            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-row>
                        <v-col>
                            <v-layout pl-10 justify-start align-start class="text-center, display-1">Quizzes</v-layout>
                        </v-col>
                        <v-col>
                            <v-text-field  hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-layout pr-10 justify-end align-center class="text-right, display-1"><v-btn to="/quiz-creator" color="primary">Create Quiz</v-btn></v-layout>
                        </v-col>
                    </v-row>
                </v-layout>
            </v-container>


            <v-container>
                <v-row>
                    <v-col v-for="quiz in filteredList" :key="quiz.key" cols="4"><!--Generates a quiz card for every quiz object in the database-->
                        <quiz-card @quizView="onQuizView" :quiz="quiz" ></quiz-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div v-else-if="render === 'quizView'"><!--Displays if render is equal to quizview-->
            <quiz-view @catalogueView="onCatalogueView" @quizEdit="onQuizEdit" :quiz="this.viewingQuiz" :key="editKey"></quiz-view>
        </div>

        <div v-if="render === 'editView'"><!--Displays if render is equal to editview-->
            <edit-card @refresh="onRefresh" :quiz="this.viewingQuiz" ></edit-card>
        </div>

        <v-footer class="mt-12"></v-footer>
    </v-container>
</template>



<script>

    import quizCard from "../Components/quiz-card";
    import quizView from "../Components/quiz-view";
    import editCard from "../Components/edit-card";
    export default {
        name: "QuizCatalogue",
        components: {quizCard, quizView, editCard},

        // grabbing all data on page render
        beforeMount: function(){
            this.getQuizzes();
        },

        methods:{
            // getting snapshot of data from firebase
            getQuizzes: function(){
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
            onRefresh: function (updQuiz) {
                this.getQuizzes();//Collects new and updated data from firebase
                for (var i=0; i<this.quizs.length;i++){//A check is run from the quiz recieved from the edit component
                    if(this.quizs[i].key===updQuiz.key){ //if the key of the object edited from the edit view and the okey from the database matches, updates the object and renders the updated view with the quizView component
                        this.viewingQuiz = this.quizs[i];
                        this.render = "quizView";
                    }
                }
            },
            onQuizView: function(quiz) {//If called, sets the render as quizview and also sets a quiz to be viewed, displaying it on the page
                this.viewingQuiz = quiz;
                this.render = "quizView";

            },
            onQuizEdit: function() {//If called, sets the render as the edit view component, sending the viewingQuiz
                //this.viewingQuiz = quiz;
                this.render = "editView";

            },
            onCatalogueView: function() {//If called, sets render to the quizCatalogue component
                this.viewingQuiz = '';
                this.render = "quizCatalogue";

            },
            resetSearch: function() {//Resets the search term property to nothing, removing all criteria
                this.searchTerm = '';
            },
            forceRerender() {
                //Changes key top notify vuie that a change to the object has occured, forcing an update and re-render
                this.editKey += 1;
            }
        },
        //Initialised data
        data: () => ({
            render: "quizCatalogue",
            edit: false,
            deleteConfirm: false,
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: '',
            img: '',
            key: '',
            viewingQuiz:'',
            quizs: [],
            editKey: 0,
            searchTerm: '',

            data(){
                return {
                    quizs: [],
                    editKey: 0,
                }
            },
        }),
        props: {

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