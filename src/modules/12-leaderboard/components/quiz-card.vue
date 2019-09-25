<template>
    <v-card>
        <v-img :src="img" class="white--text" height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
            <v-card-title class="align-end fill-height">{{quizTitle}}</v-card-title>
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
        beforeMount: function(){//assigns all properties of the quiz object prop to computed properties declared in the component to avoid mutation
            this.img = this.quiz.img;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.setUser(this.quiz.owner_id);
            this.questions = this.quiz.questions
        },
        methods: {
            // push to a new router with the quizID that is passed in
            viewLeaderboard(quizKey) {
                this.$router.push({path: `/leaderboard/${quizKey}`});
            },
            setUser(userKey) {
                this.$db.ref('/Users/').child(userKey).once('value', (snap) => {
                    this.thisUser = snap.val();
                    this.owner = this.thisUser.fname +" "+ this.thisUser.lname;
                });
            },
        },
        props: {
            quiz: Object,
        },
        data: () => ({
            quizTitle: '',
            description: '',
            owner: '',
            questions: '',
            img: '',
            key: ''
        })
    }
</script>

<style scoped>

</style>