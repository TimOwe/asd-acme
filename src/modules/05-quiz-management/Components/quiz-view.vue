`<template>
    <div>
        <v-container>
            <v-card>
                <v-toolbar flat color="primary">
                    <v-btn color="white" icon @click="onBackButton"><v-icon size="35" >mdi-arrow-left</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="white" @click="toHost"><v-icon size="35">mdi-play</v-icon></v-btn>
                    <div v-if="!!($cookies.isKey('user'))">
                        <v-btn name="editBtn" text color="white" @click="triggerEdit()" :quiz="thisQuiz" v-if="this.$cookies.get('user').key===authorKey"><v-icon size="35">mdi-pencil</v-icon></v-btn>
                        <v-btn text color="white" @click="deleteConfirm=true" v-if="this.$cookies.get('user').key===authorKey"><v-icon size="35">mdi-delete</v-icon></v-btn>
                    </div>
                </v-toolbar>

                <v-container grid-list-md>
                    <v-img :src="img" :aspect-ratio="50/13" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                        <v-container class="fill-height" style="padding-bottom: 0">
                            <v-layout class="flex-column">
                                <v-flex class="d-flex align-start mb-6">
                                    <v-btn color="primary" class="mb-auto, subtitle-1" small style="text-transform: none; font-weight: normal; min-width: 0;" @click="handleCatClick" >{{category}}</v-btn>
                                </v-flex>
                                <v-flex class="d-flex align-end">
                                    <v-card-title style="padding-left: 0" class="mt-auto, display-1">{{quizTitle}} </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-layout class="align-start justify-end">
                                <v-chip class="subtitle-1" :color="difficultyColor"><v-layout class="white--text">{{difficulty}}</v-layout></v-chip>
                            </v-layout>
                        </v-container>
                    </v-img>

                    <v-container grid-list-md>
                        <v-layout justify-left align-center>
                            <v-flex xs10>
                                <v-layout pt-5 class="headline">{{description}}</v-layout>
                                <v-layout pt-5 class="subtitle-1"><b>Created by</b>:&nbsp;<v-btn class="subtitle-1" small style="text-transform: none; font-weight: normal; min-width: 0; padding: 0;" @click="handleNameClick" text >{{owner}}</v-btn></v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-expansion-panels v-model="panel">
                        <v-expansion-panel>
                            <v-expansion-panel-header class="headline">Questions</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div class="d-flex">
                                    <v-checkbox v-model="readonly" label="Show Answers" align="end"></v-checkbox>
                                </div>
                                <v-list>
                                    <v-list-group v-for="(question, index) in questions" :key="question.q" sub-group><!--Displays an list item for each question in the quiz-->
                                        <template v-slot:activator>
                                            <v-list-item-title class="title">{{index+1}}. {{question.q}}</v-list-item-title><!--Displays the question as a list item-->
                                            <v-list-item-action-text>{{question.score}} Points</v-list-item-action-text><!--Displays its point score-->
                                        </template>

                                        <div v-if="readonly===true"><!--If the checkbox has been ticked, the option will become available-->
                                            <v-list-item-title class="body-1, pl-4">Answers</v-list-item-title>
                                            <v-list-item>
                                                <v-layout>
                                                    <v-flex xs2 v-for="(n,i) in 4" :key="n"><!--Displays each answer propvided, highlighting the correct answer in green if its index matches the index defined in the quiz creation-->
                                                        <v-container v-bind:class="{ 'green--text': answerCheck(question.c, i), 'black--text': answerCheck(question.c, i), 'body-1': true}" name="answer" v-model="question.a[i]" :label="'Answer #'+ n">{{n}}. {{question.a[i]}}</v-container>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-item>
                                        </div>
                                    </v-list-group>
                                </v-list>

                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-container>
            </v-card>
        </v-container>

        <v-dialog width=350 v-model="deleteConfirm">
        <v-card>
            <v-card-title>
                <v-layout justify-center align-center>Confirm Quiz Delete</v-layout>
            </v-card-title>
            <v-card-text style="text-align: center">Are you sure you want to delete this quiz?</v-card-text>
            <v-card-actions>
                <v-layout justify-center align-center>
                    <v-btn color="white" @click="deleteConfirm = false">Cancel</v-btn>
                    <v-btn color="error" @click="deleteQuiz">Delete</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>

        <v-dialog width=350 v-model="hostAlert">
            <v-card>

                <v-card-title>
                    <v-layout justify-center align-center>Woah Slow Down!</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">You must be logged in to host this quiz, log in below.</v-card-text>
                <v-card-actions>
                    <v-layout justify-center align-center>
                        <v-btn color="white" @click="hostAlert = false">Back</v-btn>
                        <v-btn color="primary" to="/login">Log In</v-btn>
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
    export default {
        name: "QuizView",
        components: {
        },
        props: {
            viewKey: String
        },
        beforeMount: function(){//before page render, takes passed prop and uses it to generate quiz list
            this.newKey = this.viewKey;
            this.getQuiz(this.newKey);
        },
        methods:{
            // Gets the key from the prop and uses it to source the quiz from firebase
            getQuiz: function(key){
                this.$db.ref('/Quizs/').child(key).once('value', (snap) => {//retrieves quiz with matching key
                    this.thisQuiz = snap.val();//sets quiz property to firebase object
                    //assigns values for quiz from firebase object values
                    this.authorKey = this.thisQuiz.owner_id
                    this.setUser(this.authorKey);
                    this.img = this.thisQuiz.img;
                    this.quizTitle = this.thisQuiz.quiz_title;
                    this.description = this.thisQuiz.description;
                    this.questions = this.thisQuiz.questions;
                    this.setDifficulty(this.thisQuiz.difficulty)
                    this.setCategory();
                });
            },
            handleNameClick: function(){
                this.$router.push({path: `/profile/${this.authorKey}`})//if the creator is clicked, routes to the users profile using the key as a routing parameter
            },
            handleCatClick: function(){
                this.$router.push({ name: 'quizcatalogue', params: { inCategory: this.thisQuiz.category}});
                },
            deleteQuiz: function() {//Deletes the quiz by locating it in firebase using its key
                this.deleteConfirm = false;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$emit("delete", this.newKey)//emits delete to the QuizView to trigger quiz delete
                }, 2000);

            },
            triggerEdit: function(){
                this.$emit("quizEdit");//Emits quizzEdit to the quizcatalogue to initiate the quiz edit page to render
            },
            answerCheck: function(c, a){
                return parseInt(c)===parseInt(a);//Checks if the correct answer index printed is equal to the answer defined in the question
            },
            onBackButton: function() {
                this.$emit("catalogueView");//Emits quizzEdit to the quizcatalogue to initiate the quiz edit page to render
            },
            toHost: function() {
                if(!(this.$cookies.isKey('user'))){//if the user is logged in
                    this.hostAlert=true;//if user not logged in, activate the host alert dialog
                }
                else this.$router.push({ name: 'Host', params: { name: this.quizTitle}});//if user is logged in, route to host and send the quiz title as a parameter
            },
            setCategory: function(){//As the category  is locally defined as an object, but defined in firebase by its value, it will need to be matched to the object for it to load into the select component
                for(var i=0;i<this.categories.length;i++) {//Searches the local list
                    if (this.categories[i].value === this.thisQuiz.category) {//if the category value recieved as a prop equals the value of the local object, it sets the local object to be the result in the select component
                        this.category = this.categories[i].category;
                    }
                }
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
            setUser: function(userKey) {//takes userkey as parameter
                this.$db.ref('/Users/').child(userKey).once('value', (snap) => {//searches firebase database for child with the key passed by the parameter
                    this.thisUser = snap.val();//sets thisUser property to the child firebase object
                    this.owner = this.thisUser.fname +" "+ this.thisUser.lname;//assignes name property to the values of the user object
                });
             },

        },
        //Computed properties
        data: () => ({
            edit: false,
            deleteConfirm: false,
            hostAlert: false,
            thisQuiz: "",
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: [],
            img: '',
            category: '',
            newkey: '',
            readonly: false,
            thisUser: "",
            userFullName: "",
            authorKey: "",
            panel: 0,
            difficulty: "",
            difficultyColor: "",
            categories: [
                { category: 'Animals', value: 'animals' },
                { category: 'Business', value: 'business' },
                { category: 'Cars', value: 'cars' },
                { category: 'Country', value: 'country' },
                { category: 'Culture', value: 'culture' },
                { category: 'Economics', value: 'economics' },
                { category: 'Environment', value: 'environment' },
                { category: 'Film', value: 'film' },
                { category: 'Food', value: 'food' },
                { category: 'General Knowledge', value: 'generalknowledge' },
                { category: 'History', value: 'history' },
                { category: 'Literature', value: 'literature' },
                { category: 'Math', value: 'math' },
                { category: 'Music', value: 'music' },
                { category: 'Politics', value: 'politics' },
                { category: 'Psychology', value: 'psychology' },
                { category: 'Science', value: 'science' },
                { category: 'Sport', value: 'sport' },
                { category: 'Technology', value: 'technology' },
                { category: 'Television', value: 'television' },
                { category: 'Video Games', value: 'videogames' },
            ],

            expanded: [],
            headers: [//headers for the expandable list
                {   text: 'Question', align: 'left', sortable: false, value: 'q',},//header set to hold question names from firebase
                { text: 'Score', value: 'score' },//header set to hold scores
            ],
        }),
    }
</script>

<style scoped>
    green{
        color:green;
    }
</style>