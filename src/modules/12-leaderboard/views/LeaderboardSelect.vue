<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto" max-width="90%">
                <v-toolbar flat>
                    <v-btn icon @click="handleBack">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-center, display-1">Select Quiz Leaderboard</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-text-field  hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a Quiz"></v-text-field>
                </v-toolbar>
                <v-container fluid>
                    <v-row>
                        <v-col v-for="quiz in filteredList" :key="quiz.key" cols="4">
                            <quiz-card :quiz="quiz" :img="quiz.img" :title="quiz.quiz_title"
                                       :description="quiz.description" :owner="quiz.owner_id"
                                       :questions="quiz.questions" :key="quiz.key"></quiz-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import QuizCard from "../components/quiz-card";

    export default {
        name: "leaderboardselect",
        components: {QuizCard},
        beforeMount() {
            this.getQuizzes();
        },
        data: () => ({
            quizs: [],
            searchTerm: ''
        }),
        methods: {
            // get all quizzes from the database
            getQuizzes() {
                let quizzes = [];
                this.$db.ref('/Quizs').on('value', (snap) => {
                    snap.forEach(entry => {
                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        quizzes.push(entryObj);
                    });
                });
                this.quizs = quizzes;
            },
            resetSearch: function() {
                this.searchTerm = '';
            },
            handleBack(){
                this.$router.go(-1);
            },
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