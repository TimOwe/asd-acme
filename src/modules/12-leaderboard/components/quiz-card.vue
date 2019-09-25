<template>
    <v-card>
        <v-img :src="img" class="white--text" height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
            <v-card-title class="align-end fill-height">{{title}}</v-card-title>
        </v-img>
        <v-card-text>
            <span class="text--primary">
                <span class="body-1">{{description}}</span><br>
                <span class="caption">Created by: {{owner}}</span><br>
                <span class="caption">Questions: {{questions.length}}</span><br>
            </span>
        </v-card-text>
        <v-card-actions>
            <v-btn class="white--text" depressed color="blue" @click="viewLeaderboard(quiz.key)">View Leaderboard</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "quiz-card",
        props: {
            quiz: Object,
            img: String,
            title: String,
            description: String,
            owner: String,
            questions: Array,
            key: String
        },
        methods: {
            // push to a new router with the quizID that is passed in
            viewLeaderboard(quizKey) {
                this.$router.push({path: `/leaderboard/${quizKey}`});
            }
        }
    }
</script>

<style scoped>

</style>