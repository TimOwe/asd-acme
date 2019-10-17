<template>
    <div>
        <v-card>
            <v-img :src="img" class="white--text" height="200px" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-container class="fill-height" style="padding-bottom: 0; padding-left: 0">
                    <v-layout class="justify-start, align-end">
                        <v-card-title class="align-end">{{quizTitle}} </v-card-title>
                    </v-layout>
                    <v-layout class="align-start justify-end">
                        <v-chip :color="difficultyColor"><v-layout class="white--text">{{difficulty}}</v-layout></v-chip>
                    </v-layout>
                </v-container>
            </v-img>

            <v-container grid-list-md class="text--primary">
                    <span class="text--primary">
                        <span class="body-1">{{description}}</span><br>
                        <span class="caption"><b>Created by:</b> {{owner}}</span><br>
                        <span class="caption"><b>Questions: </b>{{questions.length}}</span><br>
                    </span>
            </v-container>

            <v-card-actions>
                <v-btn text color="grey darken-2" @click="viewQuiz(quiz.key)"><v-icon large>mdi-view-headline</v-icon>View Quiz</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "quiz-card",
        components: {},
        props: {
            quiz: Object
        },
        beforeMount: function(){//assigns all properties of the quiz object prop to computed properties declared in the component to avoid mutation
            this.img = this.quiz.img;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.setUser(this.quiz.owner_id);
            this.questions = this.quiz.questions;
            this.setDifficulty(this.quiz.difficulty);
        },
        methods: {
            viewQuiz: function(key) {//If called, pushes to the view page, sending the quiz key as a parameter
                this.$router.push('/quizview/'+key);
            },
            setDifficulty: function(inDifficulty) {//If called, pushes to the view page, sending the quiz key as a parameter
                if (inDifficulty === "easy"){//if difficulty is hard, set colour to green and text to easy
                    this.difficulty = "Easy";
                    this.difficultyColor = "green";
                }
                else if (inDifficulty==="medium"){//if difficulty is hard, set colour to orange and text to medium
                    this.difficulty = "Medium";
                    this.difficultyColor = "orange";
                }
                else if (inDifficulty==="hard"){//if difficulty is hard, set colour to red and text to hard
                    this.difficulty = "Hard";
                    this.difficultyColor = "red";
                }
            },
            setUser(userKey) {
                this.$db.ref('/Users/').child(userKey).once('value', (snap) => {//finds the user in the database with the key passed from the quiz owner id property
                    this.thisUser = snap.val();//sets user to firebase object
                    this.owner = this.thisUser.fname +" "+ this.thisUser.lname;//sets full name property to combination of first and last name values from firebase object
                });
            },
        },
        //Computed properties
        data: () => ({
            edit: false,
            deleteConfirm: false,
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: '',
            img: '',
            difficulty: "",
            difficultyColor: "",
            key: ''
        }),
    }
</script>

<style scoped>

</style>