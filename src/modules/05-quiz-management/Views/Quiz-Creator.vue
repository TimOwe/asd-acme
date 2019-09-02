<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto"
                    max-width="90%">
                <v-toolbar flat>
                    <v-btn icon to="/quizcatalogue">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-center, display-1">Create a New Quiz</v-toolbar-title>
                </v-toolbar>
                <div>
                    <v-container grid-list-md>
                        <v-layout justify-center align-center>
                            <v-flex xs7>
                                <v-text-field v-model="quizTitle" outlined shaped label="Quiz Title" name="quiztitle"></v-text-field>
                                <v-text-field v-model="description" outlined shaped label="Quiz Description" name="quizdescription"></v-text-field>
                                <v-select name="quizimage" v-model="img" :items="items" item-text="name" item-value="url" label="Select" return-object single-line></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-flex v-for="(question,index) in questionBank" :key="question.id">
                        <v-container>
                            <v-card name="questioncard">
                                <v-card-title class="justify-center">Question {{index+1}}</v-card-title>
                                <v-container grid-md-list>
                                    <v-layout justify-center>
                                        <v-flex xs8>
                                            <v-text-field v-model="question.q" label="Question:" :name="'q'+index+'questionname'"></v-text-field>
                                            <v-text-field v-model.number="question.score" label="Score:" type="number" :name="'q'+index+'questionscore'"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout justify-center>
                                        <v-flex xs2 v-for="(n,i) in 4" :key="n">
                                            <v-radio-group xs2 v-model="question.c" name="radiogroup">
                                            <v-text-field v-model="question.a[i]" :label="'Answer #'+ n" :name="'q'+index+'Answer #'+ n"></v-text-field>
                                            <v-radio label="" :name="'q'+index+'checkAnswer #'+ n" :value="i">{{i}}</v-radio>
                                        </v-radio-group>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-btn v-if="index!=0" fab top right absolute color="red" :name="'q'+index+'delete'" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                                    <v-btn name="addQuestion" v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: [], c: [0,0,0,0], score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-container grid-list-md>
                                <v-card-actions class="center">
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="index+1==questionBank.length" color="white" to="/quizcatalogue">Cancel</v-btn>
                                    <v-btn v-if="index+1==questionBank.length" color="blue" @click="confirm=true">Publish Quiz</v-btn>
                                </v-card-actions>
                            </v-container>
                        </v-container>
                    </v-flex>
                    <v-dialog width=350 v-model="confirm">
                        <v-card>
                            <v-card-title>
                                Confirm Quiz Publish
                            </v-card-title>
                            <v-card-text>Would you like to submit and publish your quiz?</v-card-text>
                            <v-card-actions>
                                <v-layout>
                                    <v-btn color="green" @click="saveQuiz">Publish</v-btn>
                                    <v-btn color="red" @click="confirm = false">Cancel</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog width=350 v-model="success">
                        <v-card>
                            <v-card-title>
                                Success!
                            </v-card-title>
                            <v-card-text>Your new quiz has been successfully created! You can return to the quiz catalogue or create a new quiz</v-card-text>
                            <v-card-actions>
                                <v-layout>
                                    <v-btn color="purple" to="/quizcatalogue">Go to Catalogue</v-btn>
                                    <v-btn color="green" @click="clearScreen">Create New Quiz</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog width=350 v-model="validation">
                        <v-card>
                            <v-card-title>
                                Please Fill Out All Fields Before Publishing
                            </v-card-title>
                            <v-card-text>Please check and ensure that every field has been filled out before publishing</v-card-text>
                            <v-card-actions>
                                <v-layout>
                                    <v-btn color="red" @click="validation = false">Close</v-btn>
                                </v-layout>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-overlay :value="loading">
                        <v-progress-circular indeterminate size="64"></v-progress-circular>
                    </v-overlay>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    export default {
        methods:{
            saveQuiz: function () {


                this.loading = true;
                if(this.validCheck()) {
                        this.newQuiz(this.quizTitle, this.questionBank, 'TestOwner', this.img.url, this.description);
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
            removeQuestion(index){
                this.questionBank.splice(index,1);
            },
            clearScreen(){
                this.success = false;
                this.quizTitle = '';
                this.description = '';
                this.questionBank = [{q: "", a: [], c: [0,0,0,0], score: ""}];
            },
            validCheck(){
                var titleCheck = this.quizTitle !== '';
                var imageCheck = this.img !== '';
                var questionCheck = true;

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
                return titleCheck && questionCheck && imageCheck;
            },
            newQuiz(quiz_title, questions, owner_id, img, description){
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
            questionBank:[{q: "", a: [], c: [0,0,0,0], score: ""}],
            quizTitle: "",
            loading: false,
            validation: false,
            scoreValidation: false,
            confirm: false,
            success: false,
            description: "",
            img: "",

            data(){
                return {
                    quizs: [],
                }
            },
        }),

    };
</script>

<style scoped>

</style>