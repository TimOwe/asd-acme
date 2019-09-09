<template>
    <div>
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
                <v-btn text color="grey darken-2" @click="onViewButton" ><v-icon>mdi-play</v-icon></v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog width=350 v-model="deleteConfirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Delete
                </v-card-title>
                <v-card-text>Are you sure you want to delete this quiz?</v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="white" @click="deleteConfirm = false">Cancel</v-btn>
                        <v-btn color="red" @click="deleteQuiz(quiz.key)">Delete</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>
    import EditCard from "../Components/edit-card";
    export default {
        name: "quiz-card",
        components: {EditCard},
        props: {
            quiz: Object
        },
        beforeMount: function(){
            this.img = this.quiz.img;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.owner = this.quiz.owner_id;
            this.questions = this.quiz.questions
        },
        methods: {
            deleteQuiz: function(quizKey) {
                this.deleteConfirm = false;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$db.ref('/Quizs/' + quizKey).remove();
                }, 2000);
            },
            onViewButton() {
                this.$emit("quizView", this.quiz);
            },
        },
        data: () => ({
            edit: false,
            deleteConfirm: false,
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: '',
            img: '',
            key: ''
        }),
    }
</script>

<style scoped>

</style>