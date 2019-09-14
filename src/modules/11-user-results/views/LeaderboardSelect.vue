<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto" max-width="90%">
                <v-toolbar flat>
                    <v-toolbar-title class="text-center, display-1">Select Quiz Leaderboard</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-container fluid>
                    <v-row>
                        <v-col v-for="quiz in quizs" :key="quiz.key" cols="4">
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
            quizs: []
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
            }
        }
    }
</script>