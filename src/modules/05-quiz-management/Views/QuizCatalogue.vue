<template>
    <v-container grid-list-md>

        <div v-if="render === 'quizCatalogue'">
            <v-toolbar flat>
                <v-btn icon><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-toolbar-title class="text-center, display-1">Quizzes</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field hide-details prepend-icon="mdi-magnify" single-line></v-text-field>
                <v-spacer></v-spacer>
                <v-btn to="/quiz-creator" color="blue">Create Quiz</v-btn>
            </v-toolbar>

            <v-container>
                <v-row>
                    <v-col v-for="quiz in quizs" :key="quiz.key" cols="4">
                        <quiz-card @quizView="onQuizView" v-on:refresh="refresh" :quiz="quiz" ></quiz-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <div v-if="render === 'quizView'">
            <v-container>
                <quiz-view @catalogueView="onCatalogueView" :quiz="this.viewingQuiz"></quiz-view>
            </v-container>
        </div>

        <v-footer class="mt-12"></v-footer>
    </v-container>
</template>



<script>

    import quizCard from "../Components/quiz-card";
    import quizView from "../Components/quiz-view";
    export default {
        name: "QuizCatalogue",
        components: {quizCard, quizView},
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
            refresh: function () {
                this.getQuizzes();
            },
            onQuizView: function(quiz) {
                this.viewingQuiz = quiz;
                this.render = "quizView";

            },
            onCatalogueView: function() {
                this.viewingQuiz = '';
                this.render = "quizCatalogue";

            },
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

            data(){
                return {
                    quizs: [],
                }
            },
        }),
        props: {

        }

    }

</script>

<style scoped>

</style>