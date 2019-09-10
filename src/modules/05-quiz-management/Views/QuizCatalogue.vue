<template>
    <v-container grid-list-md>

        <div v-if="render === 'quizCatalogue'">
            <v-toolbar flat>
                <v-btn icon><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-toolbar-title class="text-center, display-1">Quizzes</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                <v-spacer></v-spacer>
                <v-btn to="/quiz-creator" color="blue">Create Quiz</v-btn>
            </v-toolbar>

            <v-container>
                <v-row>
                    <v-col v-for="quiz in filteredList" :key="quiz.key" cols="4">
                        <quiz-card @quizView="onQuizView" :quiz="quiz" ></quiz-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div v-else-if="render === 'quizView'">
            <v-scroll-y-transition>

                <quiz-view @catalogueView="onCatalogueView" @quizEdit="onQuizEdit" :quiz="this.viewingQuiz" :key="editKey"></quiz-view>

            </v-scroll-y-transition>
        </div>

        <div v-if="render === 'editView'">
            <v-scroll-y-reverse-transition>

                <edit-card @refresh="onRefresh" :quiz="this.viewingQuiz" ></edit-card>

                </v-scroll-y-reverse-transition>
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
                this.getQuizzes();
                for (var i=0; i<this.quizs.length;i++){
                    if(this.quizs[i].key===updQuiz.key){
                        this.viewingQuiz = this.quizs[i];
                        this.render = "quizView";
                    }
                }
            },
            onQuizView: function(quiz) {
                this.viewingQuiz = quiz;
                this.render = "quizView";

            },
            onQuizEdit: function() {
                //this.viewingQuiz = quiz;
                this.render = "editView";

            },
            onCatalogueView: function() {
                this.viewingQuiz = '';
                this.render = "quizCatalogue";

            },
            resetSearch: function() {
                this.searchTerm = '';
            },
            forceRerender() {
                this.editKey += 1;
            }
        },
        // dummy data
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