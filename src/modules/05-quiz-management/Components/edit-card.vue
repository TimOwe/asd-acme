<template>
    <div>
        <v-container grid-list-md>
            <v-form v-model="valid" ref="quizForm"><!--Assigns all elements with :rule bindings to the quizForm reference-->
                <v-container grid-list-md>
                    <v-layout justify-center align-center>
                        <v-row>
                            <v-col>
                                <v-layout pl-10 justify-start align-start><v-btn icon @click="closeEdit"><v-icon>mdi-close</v-icon></v-btn></v-layout>
                            </v-col>
                            <v-col>
                                <v-layout justify-center class="display-1">Edit Quiz</v-layout>
                            </v-col>
                            <v-col>
                                <v-layout pr-10 justify-end align-center class="text-right, display-1"></v-layout>
                            </v-col>
                        </v-row>
                    </v-layout>
                </v-container>

                <v-container grid-list-md>
                    <v-layout justify-center align-center>
                        <v-flex xs7>
                            <v-text-field ref="formtitle" v-model="quizTitle" outlined shaped label="Quiz Title" name="quiztitle" :rules="[() => !!quizTitle || 'Required.', () => quizTitle.length > 4 || 'Please enter a title longer than 4 characters', () => quizTitle.length < 40 || 'Please enter a title shorter than 40 characters']" counter="40"></v-text-field>
                            <v-text-field ref="formdescription" v-model="description" outlined shaped label="Quiz Description" name="quizdescription" :rules="[() => !!description || 'Required.', () => description.length > 4 || 'Please enter a description longer than 4 characters', () => description.length <= 80 || 'Please enter a description shorter than 80 characters']" counter="80"></v-text-field>
                            <v-select ref="formimg" name="quizimage" v-model="img" :items="items" item-text="name" item-value="url" label="Select Theme" return-object single-line :rules="[() => !!img || 'Required.']"></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>

            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs7>
                        <v-container v-for="(question,index) in questionBank" :key="question.id" ref="qform"> <!--Creates a new card for each question that is added-->
                            <v-card>
                                <v-toolbar color="primary" dark flat>
                                    <v-layout justify-center class="headline">Question {{index+1}}</v-layout>
                                </v-toolbar>
                                <v-form ref="questionForm" v-model="valid"><!--Assigns all elements within the card to the questionForm reference. Will handle dynamically generated inputs by default-->
                                    <v-container grid-md-list>
                                        <v-layout justify-center>
                                            <v-flex xs8>
                                                <v-text-field ref="formquestion" v-model="question.q" label="Question:" :name="'q'+index+'questionname'" :rules="[() => !!question.q || 'Required.', () => question.q.length > 4 || 'Please enter a question longer than 4 characters', () => question.q.length <= 80 || 'Please enter a question shorter than 80 characters']" counter="80"></v-text-field>
                                                <v-text-field ref="formscore" v-model.number="question.score" label="Score:" type="number" :name="'q'+index+'questionscore'" :rules="[() => !!question.q || 'Required.', () => question.score >= 100 || 'Please enter a score higher than 100 points', () => question.score < 10000 || 'Please enter a score lower than 9999 points']" counter="40"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout justify-center>
                                            <v-flex xs2 v-for="(n,i) in 4" :key="n" ><!--Creates four columns each with a text field and a radio button for each question-->
                                                <v-radio-group xs2 v-model="question.c" name="radiogroup">
                                                    <v-text-field v-model="question.a[i]" :label="'Answer #'+ n" :name="'q'+index+'Answer #'+ n" :rules="[() => !!question.a[i] || 'Required.', () => question.a[i].length <= 40 || 'Please enter an answer shorter than 40 characters']"></v-text-field>
                                                    <v-radio :name="'q'+index+'checkAnswer #'+ n" :value="i">{{i}}</v-radio>
                                                </v-radio-group>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>

                                    <v-card-actions>
                                        <v-container>
                                            <v-btn v-if="index!=0" fab top right absolute color="red" :name="'q'+index+'delete'" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                                            <!--Adds new question to the questionbank if the button is pushed. The button is kept on the v-card representing the bottom most element in the array-->
                                            <v-btn name="addQuestion" v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: ['','','',''], c: [0,0,0,0], score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                                        </v-container>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container>
                <v-layout justify-center>
                    <v-btn class="ma-1" color="white" @click="closeEdit()">Cancel</v-btn>
                    <v-btn class="ma-1" color="primary" @click="confirm=true">Update Quiz</v-btn>
                </v-layout>
            </v-container>

        </v-container>

        <v-dialog width=350 v-model="confirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Update
                </v-card-title>
                <v-card-text>Would you like to update this quiz with these new details?</v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="white" @click="confirm = false">Cancel</v-btn>
                        <v-btn color="primary" @click="saveQuiz">Update</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-on:closeEdit="triggerClose" width=350 v-model="success">
            <v-card>
                <v-card-title>
                    Success!
                </v-card-title>
                <v-card-text>Your new quiz has been successfully updated! Click below to see your updated quiz!.</v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="primary" @click="closeEdit()">Go to Quiz</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width=350 v-model="validation">
            <v-card>
                <v-card-title>
                    Please Fill Out All Fields Correctly
                </v-card-title>
                <v-card-text>Please check and ensure that every field has been filled out correctly before publishing
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="error" @click="validation = false">Close</v-btn>
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

        name: "edit-card",
        props: {
            quiz: Object,

        },
        beforeMount: function(){//assigns all properties of the quiz object prop to computed properties declared in the component to avoid mutation
            this.newImg();
            this.key = this.$route.params.id;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.owner = this.quiz.owner;
            this.questionBank = this.quiz.questions
        },

    methods: {
            saveQuiz: function(){
                //Calls function which returns true if all fields pass validation
                if(this.formCheck()) {
                    this.updateQuiz(this.quizTitle, this.questionBank, 'TestOwner', this.img.url, this.description);
                    this.confirm = false;//Removes confirmation dialog
                    this.loading = true;//Displays loading screen
                    //Sets timeout for the loading screen
                    setTimeout(() => {
                        this.loading = false;
                        this.success = true;//Once timeout finishes, loading is removed and success page is shown
                    }, 2000);
                }else {
                    this.confirm = false;//Removes the confirmation window and displays the form again
                    this.validation  = true;
                    this.loading = false;

                }
            },
            updateQuiz: function(quiz_title, questions, owner_id, img, description){//Takes all computed properties from teh form and pushes it to update the ibject in firebase with its identical key. If properties are the same, no changes are made, if they differ, they are updated
                this.$db.ref('/Quizs/'+this.key).update({"quiz_title": quiz_title, "questions": questions, "owner_id": owner_id, "img": img, "description": description})
            },
            removeQuestion: function(index){
                this.questionBank.splice(index,1);
            },
            newImg: function(){//As the image is locally defined as an object, but defined in firebase by its url, it will need to be matched to the iobject for it to load into the select component
                for(var i=0;i<3;i++) {//Searches the local list
                    if (this.items[i].url === this.quiz.img) {//if the quiz url recieved as a prop equals the url of the local object, it sets the local object to be the result in the select component
                        this.img = this.items[i];
                    }
                }

            },
            formCheck: function(){
                this.falseCount = 0;//Sets a false count
                if(!this.$refs.quizForm.validate(true)) {//First validates all elements with rule bindings within the quizform v-form element
                    this.falseCount++;//If a field does not pass validation tests, the count is incremented
                }
                for (let i =0; i<this.questionBank.length; i++){//For every question in the questionbank
                    if(!this.$refs.questionForm[i].validate(true)){//Validate every field for that question
                        this.falseCount++;//if a field for the specified question does not pass validation, falsecount is incremented
                    }
                }
                return !this.falseCount>=1//if no validations havce failed, the count will be 0 and hence true, else it will result in false
            },

            triggerClose: function(){//Emits function to the quiz catalogue to remove the quiz edit render
                this.$emit('closeEdit');
            },
            closeEdit: function(){//emits function to quiz catalogue to remove quiz editor and update the quiz object as changes have been made, to then be viewed
                this.$emit("refresh", this.quiz);
            },


        },
        //Computed properties
        data: () => ({
            success: false,
            confirm: false,
            loading: false,
            validation: false,
            //Local list of objects with URL's
            items: [
                { name: 'Dark', url: 'https://imgur.com/c7txWI3.png' },
                { name: 'Light', url: 'https://imgur.com/taxTHeY.jpg' },
                { name: 'Colourful', url: 'https://imgur.com/zmxFPdu.jpg' },
            ],
            quizTitle: '',
            description: '',
            owner: '',
            questionBank: '',
            img: '',
            key: '',
            valid: true,
            falseCount: 0,

        }),
    }
</script>

<style scoped>

</style>