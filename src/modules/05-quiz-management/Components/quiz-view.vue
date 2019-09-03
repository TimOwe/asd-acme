<template>
    <div>
        <v-container>
            <v-toolbar flat>
                <v-btn icon @click="onBackButton"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-toolbar-title class="text-center, headline">Quizzes</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text color="grey darken-2"><v-icon size="35">mdi-play</v-icon></v-btn>
                <v-btn text color="grey darken-2" @click.stop="edit=true" :quiz="quiz"><v-icon size="35">mdi-pencil</v-icon></v-btn>
                <v-btn text color="grey darken-2" @click="deleteConfirm=true"><v-icon size="35">mdi-delete</v-icon></v-btn>
            </v-toolbar>
            <v-img :src="img" :aspect-ratio="16/9" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-container align="end" class="lightbox white--text pa-2 fill-height">
                <div class="display-4">{{quizTitle}}</div>
                </v-container>
            </v-img>

            <v-card-text>
                <span class="text--primary">
                    <span class="body-1">{{description}}</span><br>
                    <span class="caption">Created by: {{owner}}</span><br>
                    <span class="caption">Questions: {{questions.length}}</span><br>
                </span>
            </v-card-text>

            <v-card v-for="(question,index) in questions" :key="question.id">
                <v-layout justify-center class="headline">Question {{index+1}}</v-layout>
                <v-layout justify-center class="subtitle-1">{{question.q}}</v-layout>

            </v-card>
        </v-container>

        <v-dialog persistent scrollable fullscreen hide-overlay transition="dialog-bottom-transition" v-model="edit">
            <edit-card v-on:closeEdit="closeEdit" :quiz="quiz" ></edit-card>
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
                    this.$emit("catalogueView")
                }, 2000);

            },
            closeEdit: function(){
                this.edit=false;
                this.$emit('refresh');
            },
            onBackButton() {
                this.$emit("catalogueView");
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