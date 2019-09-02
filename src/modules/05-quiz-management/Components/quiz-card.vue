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
            <v-btn text color="green">Play</v-btn>
            <v-btn text color="orange" @click="edit=true" :quiz="quiz" :img="quiz.img" :newquizTitle="quiz.quiz_title" :description="quiz.description" :owner="quiz.owner_id" :questionBank="quiz.questions">Edit</v-btn>
            <v-btn text color="red" @click="deleteConfirm=true">Delete</v-btn>
        </v-card-actions>
        <v-dialog width=auto persistent v-model="edit">
            <edit-card v-on:closeEdit="closeEdit" :quiz="quiz" :selectedImg="quiz.img" :quizTitle="quiz.quiz_title" :description="quiz.description" :owner="quiz.owner_id" :questionBank="quiz.questions"></edit-card>
        </v-dialog>
        <v-dialog width=350 v-model="deleteConfirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Delete
                </v-card-title>
                <v-card-text>Are you sure you want to delete this quiz?</v-card-text>
                <v-card-actions>
                    <v-layout>
                        <v-btn color="white" @click="deleteConfirm = false">Cancel</v-btn>
                        <v-btn color="red" @click="deleteQuiz(quiz.key)">Delete</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-card>
</template>

<script>
    import EditCard from "../Components/edit-card";
    export default {
        name: "quiz-card",
        components: {EditCard},
        props: {
            quiz: Object,
            img: String,
            title: String,
            description: String,
            owner: String,
            questions: Array,
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
            closeEdit: function(){
                this.edit=false;
                this.$emit('refresh');
            },
        },
        data: () => ({
            edit: false,
            deleteConfirm: false,
            loading: false
        }),
    }
</script>

<style scoped>

</style>