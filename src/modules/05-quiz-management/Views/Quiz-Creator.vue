<template>
    <div>
        <v-container grid-list-md>
        <v-card>
            <v-toolbar flat>
                <v-btn icon to="/quizcatalogue">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-layout pb-2 justify-center class="display-1">Create a New Quiz</v-layout>
            </v-toolbar>


            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs7>
                        <v-text-field v-model="quizTitle" outlined shaped label="Quiz Title" name="quiztitle" :rules="[rules.required, rules.titleMinimum, rules.titleMaximum]" counter="40"></v-text-field>
                        <v-text-field v-model="description" outlined shaped label="Quiz Description" name="quizdescription" :rules="[rules.required, rules.descMinimum, rules.descMaximum]" counter="80"></v-text-field>
                        <v-select name="quizimage" v-model="img" :items="items" item-text="name" item-value="url" label="Select Theme" return-object single-line :rules="[rules.required]"></v-select>
                            <v-layout>
                                <v-flex xs6>
                                    <v-text-field v-model="questionTime" outlined shaped label="Seconds Per Question" type="number" name="questiontime" :rules="[rules.required, rules.timeMinimum, rules.timeMaximum]"></v-text-field>
                                </v-flex>
                                <v-flex xs2></v-flex>
                                <v-flex xs4>
                                    <v-btn-toggle :rules="[rules.required]" v-model="score_decay">
                                        <v-btn color="green" value="0.1">
                                            <v-icon>mdi-format-align-left</v-icon>
                                        </v-btn>
                                        <v-btn color="orange" value="0.2">
                                            <v-icon>mdi-format-align-center</v-icon>
                                        </v-btn>
                                        <v-btn color="red" value="0.3">
                                            <v-icon>mdi-format-align-right</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>

                                </v-flex>
                            </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs7>
            <v-card-text>
                <v-container v-for="(question,index) in questionBank" :key="question.id">
                <v-card>
                    <v-toolbar color="primary" dark flat>
                        <v-layout justify-center class="headline">Question {{index+1}}</v-layout>
                    </v-toolbar>


                    <v-container grid-md-list>
                        <v-layout justify-center>
                            <v-flex xs8>
                                <v-text-field v-model="question.q" label="Question:" :name="'q'+index+'questionname'" :rules="[rules.required, rules.questMinimum, rules.questMaximum]" counter="80"></v-text-field>
                                <v-text-field v-model.number="question.score" label="Score:" type="number" :name="'q'+index+'questionscore'" :rules="[rules.required, rules.scoreMinimum, rules.scoreMaximum]" counter="40"></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout justify-center>
                            <v-flex xs2 v-for="(n,i) in 4" :key="n">
                                <v-radio-group xs2 v-model="question.c" name="radiogroup" :rules="[rules.required]">
                                    <v-text-field v-model="question.a[i]" :label="'Answer #'+ n" :name="'q'+index+'Answer #'+ n" :rules="[rules.required, rules.answerMinimum, rules.answerMaximum]"></v-text-field>
                                    <v-radio label="" :name="'q'+index+'checkAnswer #'+ n" :value="i">{{i}}</v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <v-card-actions>
                        <v-container>
                            <v-btn v-if="index!=0" fab top right absolute color="red" :name="'q'+index+'delete'" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                            <v-btn name="addQuestion" v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: [], c: [0,0,0,0], score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
                </v-container>
            </v-card-text>
                        </v-flex>
                </v-layout>
            </v-container>
            <v-container grid-md-list>
                <v-layout justify-center pb-4>
            <v-card-actions>
                    <v-btn color="white" to="/quizcatalogue">Cancel</v-btn>
                    <v-btn color="primary" @click="confirm=true">Publish Quiz</v-btn>
            </v-card-actions>
                </v-layout>
            </v-container>
        </v-card>
        </v-container>

        <v-dialog width=350 v-model="confirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Publish
                </v-card-title>
                <v-card-text>Would you like to submit and publish your quiz?</v-card-text>
                <v-card-actions>
                    <v-layout  justify-center>
                        <v-btn color="white" @click="confirm = false">Cancel</v-btn>
                        <v-btn color="primary" @click="saveQuiz">Publish</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width=350 v-model="success">
            <v-card>
                <v-card-title>
                    Success!
                </v-card-title>
                <v-card-text>Your new quiz has been successfully created! You can return to the quiz catalogue or create
                    a new quiz
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="primary" to="/quizcatalogue">Go to Catalogue</v-btn>
                        <!--<v-btn color="blue" @click="clearScreen">Create New Quiz</v-btn>-->
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width=350 v-model="validation">
            <v-card>
                <v-card-title>
                    Please Fill Out All Fields Before Publishing
                </v-card-title>
                <v-card-text>Please check and ensure that every field has been filled out before publishing
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="red" @click="validation = false">Close</v-btn>
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
        methods:{
            saveQuiz: function () {
                this.loading = true;
                if(this.validCheck()) {
                    this.newQuiz(this.quizTitle, this.questionBank, 'TestOwner', this.img.url, this.description, this.questionTime, this.score_decay);
                    this.confirm = false;
                    setTimeout(() => {
                        this.loading = false;
                        this.success = true;
                    }, 2000);
                }else {
                    this.confirm = false;
                    this.loading = false;
                    this.validation = true;
                }
            },
            removeQuestion: function(index){
                this.questionBank.splice(index,1);
            },
            clearScreen: function(){
                this.success = false;
                this.quizTitle = '';
                this.description = '';
                this.questionBank = [{q: "", a: [], c: [0,0,0,0], score: ""}];
            },
            validCheck: function(){
                var titleCheck = this.quizTitle !== '';
                var imageCheck = this.img !== '';
                var questionCheck = true;
                var decayCheck = this.score_decay !=='';

                this.questionBank.forEach(question => {
                    if(question.q !== '' && question.c.length !== 4 && question.score !== ''){
                        for(var i=0;i<4;i++){
                            if(question.a[i] === '' || question.a[i] === undefined){
                                questionCheck = false;
                            }
                        }
                    } else {
                        questionCheck = false;
                    }
                });
                return titleCheck && questionCheck && imageCheck &&decayCheck;
            },
            newQuiz: function(quiz_title, questions, owner_id, img, description){
                var Quiz = {
                    quiz_title,
                    questions,
                    owner_id,
                    img,
                    description
                };
                var reciept = this.$db.ref('/Quizs').push(Quiz);
                return reciept.key;
            },
        },

        data: () => ({
            items: [
                { name: 'Dark', url: 'https://imgur.com/c7txWI3.png' },
                { name: 'Light', url: 'https://imgur.com/taxTHeY.jpg' },
                { name: 'Colourful', url: 'https://imgur.com/zmxFPdu.jpg' },
            ],
            toggle: undefined,
            questionBank:[{q: "", a: [], c: [0,0,0,0], score: ""}],
            quizTitle: "",
            questionTime: '',
            score_decay: '',
            loading: false,
            validation: false,
            scoreValidation: false,
            confirm: false,
            success: false,
            description: "",
            img: "",
            rules: {
                required: value => !!value || 'Required.',
                timeMinimum: value => value >= 5 || 'Please enter a time longer than 5 seconds',
                timeMaximum: value => value < 45 || 'Please enter a time less than 45 seconds',

                titleMinimum: value => value.length > 4 || 'Please enter a title longer than 4 characters',
                titleMaximum: value => value.length < 40 || 'Please enter a title shorter than 40 characters',

                descMinimum: value => value.length > 4 || 'Please enter a description longer than 4 characters',
                descMaximum: value => value.length <= 80 || 'Please enter a description shorter than 80 characters',

                questMinimum: value => value.length > 4 || 'Please enter a question longer than 4 characters',
                questMaximum: value => value.length <= 80 || 'Please enter a question shorter than 80 characters',

                scoreMinimum: value => value >= 100 || 'Please enter a score higher than 100 points',
                scoreMaximum: value => value < 10000 || 'Please enter a score lower than 9999 points',

                answerMinimum: value => value.length > 4 || 'Please enter an answer longer than 4 characters',
                answerMaximum: value => value.length <= 40 || 'Please enter an answer shorter than 40 characters',
            },

            data(){
                return {
                    quizs: [],
                    rules: {
                        required: value => !!value || 'Required.',
                        timeMinimum: value => value >= 5 || 'Please enter a time longer than 5 seconds',
                        timeMaximum: value => value < 45 || 'Please enter a time less than 45 seconds',

                        titleMinimum: value => value.length > 4 || 'Please enter a title longer than 4 characters',
                        titleMaximum: value => value.length < 40 || 'Please enter a title shorter than 40 characters',

                        descMinimum: value => value.length > 4 || 'Please enter a description longer than 4 characters',
                        descMaximum: value => value.length <= 80 || 'Please enter a description shorter than 80 characters',

                        questMinimum: value => value.length > 4 || 'Please enter a question longer than 4 characters',
                        questMaximum: value => value.length <= 80 || 'Please enter a question shorter than 80 characters',

                        scoreMinimum: value => value >= 100 || 'Please enter a score higher than 100 points',
                        scoreMaximum: value => value < 10000 || 'Please enter a score lower than 9999 points',

                        answerMinimum: value => value.length > 4 || 'Please enter an answer longer than 4 characters',
                        answerMaximum: value => value.length <= 40 || 'Please enter an answer shorter than 40 characters',
                    },
                }
            },
        }),

    };
</script>

<style scoped>

</style>