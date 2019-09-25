`<template>
    <div>
        <v-container>
            <v-card>
                <v-toolbar flat color="primary">
                    <v-btn color="white" icon @click="onBackButton"><v-icon size="35" >mdi-arrow-left</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="white" @click="toHost"><v-icon size="35">mdi-play</v-icon></v-btn>
                    <div v-if="!!($cookies.isKey('user'))">
                    <v-btn text color="white" @click="triggerEdit()" :quiz="thisQuiz" v-if="this.$cookies.get('user').key===authorKey"><v-icon size="35">mdi-pencil</v-icon></v-btn>
                    <v-btn text color="white" @click="deleteConfirm=true" v-if="this.$cookies.get('user').key===authorKey"><v-icon size="35">mdi-delete</v-icon></v-btn>
                    </div>
                </v-toolbar>
                <v-container grid-list-md>

                    <v-img :src="img" :aspect-ratio="50/13" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"><!--Sets aspect ratio on image--></v-img>

                    <v-container>
                        <v-layout pt-5 class="display-2">{{quizTitle}}</v-layout>
                        <v-layout pt-5 class="headline">{{description}}</v-layout>
                        <v-layout pt-5 class="subtitle-1"><b>Created by</b>:&nbsp;<v-btn class="subtitle-1" small style="text-transform: none; font-weight: normal; min-width: 0; padding: 0;" @click="handleNameClick" text >{{owner}}</v-btn></v-layout>
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
                <v-layout justify-center align-center>
                    Confirm Quiz Delete</v-layout>
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

                <v-card-title ali>
                    <v-layout justify-center align-center>
                        Woah Slow Down!</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">
                    You must be logged in to host this quiz, log in below.</v-card-text>
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
        beforeMount: function(){
            this.newKey = this.viewKey;
            this.getQuiz(this.newKey);
        },
        methods:{
            // getting snapshot of data from firebase
            getQuiz: function(key){
                this.$db.ref('/Quizs/').child(key).once('value', (snap) => {
                    this.thisQuiz = snap.val();
                    this.authorKey = this.thisQuiz.owner_id
                    this.setUser(this.authorKey);
                    this.img = this.thisQuiz.img;
                    this.quizTitle = this.thisQuiz.quiz_title;
                    this.description = this.thisQuiz.description;
                    this.questions = this.thisQuiz.questions;
                });
            },
            handleNameClick(){
                this.$router.push({path: `/profile/${this.authorKey}`})
            },
            deleteQuiz: function() {//Deletes the quiz by locating it in firebase using its key
                this.deleteConfirm = false;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$emit("delete", this.newKey)
                }, 2000);

            },
            triggerEdit: function(){
                this.$emit("quizEdit");//Emits quizzEdit to the quizcatalogue to initiate the quiz edit page to render
            },
            answerCheck: function(c, a){
                return parseInt(c)===parseInt(a);//Checks if the correct answer index printed is equal to the answer defined in the question
            },
            onBackButton() {
                this.$emit("catalogueView");//Emits quizzEdit to the quizcatalogue to initiate the quiz edit page to render
            },
            toHost() {
                if(!(this.$cookies.isKey('user'))){
                    this.hostAlert=true;
                }
                else this.$router.push({ name: 'Host', params: { name: this.quizTitle}});
            },
            setUser(userKey) {
                this.$db.ref('/Users/').child(userKey).once('value', (snap) => {
                    this.thisUser = snap.val();
                    this.owner = this.thisUser.fname +" "+ this.thisUser.lname;
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
            newkey: '',
            readonly: false,
            thisUser: "",
            userFullName: "",
            authorKey: "",
            panel: 0,


            expanded: [],
            headers: [
                {   text: 'Question', align: 'left', sortable: false, value: 'q',},
                { text: 'Score', value: 'score' },
            ],
        }),
    }
</script>

<style scoped>
    green{
        color:green;
    }



</style>`