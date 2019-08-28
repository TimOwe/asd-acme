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
            <v-btn text color="blue" @click="viewLeaderboard(quiz.key)">View Leaderboard</v-btn>
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
            viewLeaderboard(quizKey) {
                this.$router.push({path: `/leaderboard/${quizKey}`});
                // something to open up a new leaderboard
                // find id of this quiz in the leaderboard
                // render that leaderboard
            }
        }
    }
</script>

<style scoped>

</style>