<template>
    <div>
        <v-container v-if="!!$cookies.isKey('user')" grid-list-md>
            <v-form v-model="valid" ref="quizForm"><!--Assigns all elements with :rule bindings to the quizForm reference-->

                <v-container grid-list-md>
                    <v-layout justify-center align-center>
                        <v-row>
                            <v-col>
                                <v-layout pl-10 justify-start align-start><v-btn icon to="/quizcatalogue"><v-icon>mdi-arrow-left</v-icon></v-btn></v-layout>
                            </v-col>
                            <v-col>
                                <v-layout pt-2 justify-center align-center class="display-1">Create a New Quiz</v-layout>
                            </v-col>
                            <v-col>
                                <v-layout pt-8 pr-10 justify-end align-center class="text-right, display-1"></v-layout>
                            </v-col>
                        </v-row>
                    </v-layout>
                </v-container>

                <v-container grid-list-md>
                    <v-layout justify-center align-center>
                        <v-flex xs8>
                            <v-card>
                                <v-toolbar color="primary" dark flat>
                                    <v-layout justify-center class="headline">Quiz Details</v-layout>
                                </v-toolbar>
                                <v-container grid-list-md>
                                    <v-flex>
                                        <v-text-field ref="formtitle" v-model="quizTitle" outlined shaped label="Quiz Title" name="quiztitle" :rules="[rules.required, rules.titleMinimum, rules.titleMaximum]" counter="60"></v-text-field>
                                        <v-text-field ref="formdescription" v-model="description" outlined shaped label="Quiz Description" name="quizdescription" :rules="[rules.required, rules.descMinimum, rules.descMaximum]" counter="80"></v-text-field>
                                        <v-select ref="formimg" name="quizimage" v-model="img" :items="items" item-text="name" item-value="url" label="Select Theme" return-object single-line :rules="[rules.required]"></v-select>
                                        <v-select name="quizcategory" v-model="category" :items="categories" item-text="category" item-value="value" label="Select Category" :rules="[rules.required]" return-object single-line></v-select>
                                    </v-flex>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>

                <v-container grid-list-md>
                    <v-layout justify-center align-center>
                        <v-flex xs8>
                            <v-card>
                                <v-toolbar color="primary" dark flat>
                                    <v-layout justify-center class="headline">Quiz Difficulty</v-layout>
                                </v-toolbar>
                                <v-container grid-list-md>
                                    <v-layout justify-center>
                                        <v-flex xs6>
                                            <v-container grid-list-md>
                                                <v-layout justify-center align-center >
                                                    <v-btn-toggle mandatory ref="decay" v-model="difficulty" class="justify-center" name="questiondifficulty">
                                                        <v-btn name="easybutton" tile outlined color="green" value="easy">Easy</v-btn>
                                                        <v-btn name="medbutton" tile color="orange" outlined value="medium">Medium</v-btn>
                                                        <v-btn name="hardbutton" tile outlined color="red" value="hard">Hard</v-btn>
                                                    </v-btn-toggle>
                                                </v-layout>
                                            </v-container>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>

            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs8>
                        <v-card>
                            <v-toolbar color="primary" dark flat>
                                <v-layout justify-center class="headline">Quiz Questions</v-layout>
                            </v-toolbar>

                            <v-container grid-list-md>
                                <v-layout justify-center align-center>
                                    <v-flex xs10>

                                        <v-container v-for="(question,index) in questionBank" :key="question.id" ref="qform"> <!--Creates a new card for each question that is added-->
                                            <v-card>
                                                <v-toolbar color="purple" flat>
                                                    <v-layout justify-center class="white--text"><span class="headline">Question {{index+1}}</span></v-layout>
                                                </v-toolbar>
                                                <v-form ref="questionForm" v-model="valid"><!--Assigns all elements within the card to the questionForm reference. Will handle dynamically generated inputs by default-->
                                                    <v-container grid-md-list>
                                                        <v-layout justify-center>
                                                            <v-flex xs8>
                                                                <v-text-field ref="formquestion" v-model="question.q" label="Question:" :name="'q'+index+'questionname'" :rules="[rules.required, rules.questMinimum, rules.questMaximum]" counter="80"></v-text-field>
                                                                <v-text-field ref="formscore" v-model.number="question.score" label="Score:" type="number" :name="'q'+index+'questionscore'" :rules="[rules.required, rules.scoreMinimum, rules.scoreMinimum]" counter="40"></v-text-field>
                                                            </v-flex>
                                                        </v-layout>
                                                        <v-layout justify-center>
                                                            <v-flex xs2 v-for="(n,i) in 4" :key="n" ><!--Creates four columns each with a text field and a radio button for each question-->
                                                                <v-radio-group xs2 v-model="question.c" name="radiogroup">
                                                                    <v-text-field v-model="question.a[i]" :label="'Answer #'+ n" :name="'q'+index+'Answer #'+ n" :rules="[rules.required, rules.answerMaximum]"></v-text-field>
                                                                    <v-radio :name="'q'+index+'checkAnswer #'+ n" :value="i">{{i}}</v-radio>
                                                                </v-radio-group>
                                                            </v-flex>
                                                        </v-layout>
                                                    </v-container>

                                                    <v-card-actions>
                                                        <v-container>
                                                            <v-btn v-if="index!=0" fab top right absolute color="red" :name="'q'+index+'delete'" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                                                            <!--Adds new question to the questionbank if the button is pushed. The button is kept on the v-card representing the bottom most element in the array-->
                                                            <v-btn name="addQuestion" v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: ['','','',''], c: 0, score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                                                        </v-container>
                                                    </v-card-actions>
                                                </v-form>
                                            </v-card>
                                        </v-container>

                                    </v-flex>
                                </v-layout>
                            </v-container>

                        </v-card>

                        <v-container grid-md-list>
                            <v-layout justify-center pt-4 pb-4>
                                <v-btn class="ma-1" color="white" to="/quizcatalogue">Cancel</v-btn>
                                <v-btn class="ma-1" color="primary" @click="confirm=true">Publish Quiz</v-btn>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>

        </v-container>

        <v-container v-else-if="!($cookies.isKey('user'))" grid-list-md>
            <v-layout justify-center align-center>
                <v-card>
                    <v-toolbar color="red" dark flat>
                        <v-layout justify-center class="headline">Error!</v-layout>
                    </v-toolbar>
                    <v-card-text>You must be logged in to create a quiz! Either log in or return to the Quiz Catalogue</v-card-text>
                    <v-card-actions>
                        <v-layout  justify-center>
                            <v-btn color="green" to="/login"><v-layout justify-center class="white--text">Log In</v-layout></v-btn>
                            <v-btn color="primary" to="/quizcatalogue">Return to Catalogue</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>

        <v-dialog width=350 v-model="confirm">
            <v-card>
                <v-card-title>
                    <v-layout justify-center align-center>Confirm Quiz Publish</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">Would you like to submit and publish your quiz?</v-card-text>
                <v-card-actions>
                    <v-layout  justify-center align-center>
                        <v-btn color="white" @click="confirm = false">Cancel</v-btn>
                        <v-btn color="primary" @click="saveQuiz">Publish</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width=350 v-model="success">
            <v-card>
                <v-card-title><v-layout justify-center align-center>Success!</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">Your new quiz has been successfully created! Click here to view it
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center align-center>
                        <v-btn color="primary" @click="redirectToQuiz">Go to Quiz</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width=350 v-model="validation"><!--Displays if there are validation errors-->
            <v-card>
                <v-card-title><v-layout justify-center align-center>Please Fill Out All Fields Correctly</v-layout>
                </v-card-title>
                <v-card-text style="text-align: center">Please check and ensure that every field has been filled out correctly before publishing
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center align-center>
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
        props:{
          activeUser: Object
        },
        methods:{
            //Quiz saving function called by publish button. Operates by calling validation function to check fields, then executes code. Displays loading screens along with calling the newQuiz function
            saveQuiz: function () {
                //Calls function which returns true if all fields pass validation
                 if(this.formCheck()) {
                    this.createdKey = this.newQuiz(this.quizTitle, this.questionBank, this.$cookies.get('user').key, this.img.url, this.category.value, this.description, this.difficulty);//Sends all proeprties of vue elements to be added to new quiz object
                    this.confirm = false;//Removes confirmation dialog
                    this.loading = true;//Displays loading screen
                    //Sets timeout for the loading screen
                     setTimeout(() => {
                        this.loading = false;
                        this.success = true;//Once timeout finishes, loading is removed and success page is shown
                    }, 2000);
                }else {
                     this.confirm = false;//Removes the confirmation window and displays the form again
                     this.validation = true;
                     this.loading = false;
                }
            },
            removeQuestion: function(index){
                this.questionBank.splice(index,1);//Removes the question in the questionbank array specified by the index given to it
            },
            redirectToQuiz: function(){
                this.$router.push('/quizview/'+this.createdKey);//redirects to quiz view from key created from newQuiz function
            },

            formCheck: function(){
                this.falseCount = 0;//Sets a false count
                if(!this.$refs.quizForm.validate(true)) {//First validates all elements with rule bindings within the quizform v-form element, validating them visually
                    this.falseCount++;//If a field does not pass validation tests, the count is incremented
                }
                for (let i =0; i<this.questionBank.length; i++){//For every question in the questionbank
                    if(!this.$refs.questionForm[i].validate(true)){//Validate every field for that question, validating them visually
                        this.falseCount++;//if a field for the specified question does not pass validation, falsecount is incremented
                    }
                }
                return !this.falseCount>=1//if no validations have failed, the count will be 0 and hence true, else it will result in false
            },
            validCheck: function() {//Function to handle data validation
                var titleCheck = this.quizTitle !== '' && this.quizTitle.length < 60 && this.quizTitle.length > 4;//sets titlecheck to true or false depending on conditions
                var descCheck = this.description !== '' && this.description.length < 80 && this.description.length > 4;//sets descCheck to true or false depending on conditions
                var imageCheck = this.img !== '';//sets imageCheck to true or false depending on conditions
                var cateCheck = this.category !== '';//sets cateCheck to true or false depending on conditions
                var questionCheck = true;
                this.questionBank.forEach(question => {//iterates through every question made
                    if (question.q !== '' && question.q.length > 4 && question.q.length < 80 && question.c.length !== 4 && question.score > 99 && question.score < 10000 ) {//checks if question name meets criteria
                        for (var i = 0; i < 4; i++) {
                            if (question.a[i] === '' || question.a[i] === undefined || question.a[i].length > 40) {//checks if each answer meets criteria
                                questionCheck = false;//if any answer does not meet, the check is set to false
                            }
                        }
                    } else {
                        questionCheck = false;//if any question name does not meet conditions, check set to false
                    }
                });
                return titleCheck && questionCheck && imageCheck && cateCheck &&descCheck;//if all conditions are true will return true, if at least one is false, the whole function returns false
            },

                newQuiz: function(quiz_title, questions, owner_id, img, category, description, difficulty){
                var time_created = new Date().getTime();
                    var Quiz = {
                        //New quiz object is created with the properties passed from the form
                        quiz_title,
                        questions,
                        owner_id,
                        img,
                        category,
                        description,
                        difficulty,
                        time_created
                    };
                var reciept = this.$db.ref('/Quizs').push(Quiz);//The object is then pushed to the quizs table in firebase, adding it as an object
                return reciept.key;//Its firebase obkect key is returned
            },
        },
        //Computed property declarations
        data: () => ({
            items: [
                { name: 'Dark', url: 'https://imgur.com/c7txWI3.png' },
                { name: 'Light', url: 'https://imgur.com/taxTHeY.jpg' },
                { name: 'Colourful', url: 'https://imgur.com/zmxFPdu.jpg' },
            ],
            categories: [
                { category: 'General Knowledge', value: 'generalknowledge' },
                { category: 'Environment', value: 'environment' },
                { category: 'Cars', value: 'cars' },
                { category: 'History', value: 'history' },
                { category: 'Sport', value: 'sport' },
                { category: 'Technology', value: 'technology' },
                { category: 'Country', value: 'country' },
                { category: 'Animals', value: 'animals' },
                { category: 'Film', value: 'film' },
            ],
            toggle: undefined,
            questionBank:[{q: "", a: ["","","",""], c: 0, score: ""}],
            quizTitle: "",
            loading: false,
            validation: false,
            scoreValidation: false,
            confirm: false,
            success: false,
            description: "",
            img: "",
            category: "",
            valid: true,
            falseCount: 0,
            clicked: false,
            difficulty: "easy",
            createdKey: "",
            rules: {
                //rules for onscreen validation messages to trigger
                required: value => !!value || 'Required.',

                titleMinimum: value => value.length > 4 || 'Please enter a title longer than 4 characters',
                titleMaximum: value => value.length <= 60 || 'Please enter a title shorter than 60 characters',

                descMinimum: value => value.length > 4 || 'Please enter a description longer than 4 characters',
                descMaximum: value => value.length <= 80 || 'Please enter a description shorter than 80 characters',

                questMinimum: value => value.length > 4 || 'Please enter a question longer than 4 characters',
                questMaximum: value => value.length <= 80 || 'Please enter a question shorter than 80 characters',

                scoreMinimum: value => value >= 100 || 'Please enter a score higher than 100 points',
                scoreMaximum: value => value < 10000 || 'Please enter a score lower than 9999 points',

                answerMaximum: value => value.length <= 40 || 'Please enter an answer shorter than 40 characters',
            },

            data(){
                return {
                    questionBank:[{q: "", a: ["","","",""], c: 0, score: ""}],
                    quizTitle: "",
                    description: "",
                    img: "",
                    category: "",
                    difficulty: "easy",
                    rules: {
                        //rules for onscreen validation messages to trigger
                        required: value => !!value || 'Required.',

                        titleMinimum: value => value.length > 4 || 'Please enter a title longer than 4 characters',
                        titleMaximum: value => value.length <= 60 || 'Please enter a title shorter than 60 characters',

                        descMinimum: value => value.length > 4 || 'Please enter a description longer than 4 characters',
                        descMaximum: value => value.length <= 80 || 'Please enter a description shorter than 80 characters',

                        questMinimum: value => value.length > 4 || 'Please enter a question longer than 4 characters',
                        questMaximum: value => value.length <= 80 || 'Please enter a question shorter than 80 characters',

                        scoreMinimum: value => value >= 100 || 'Please enter a score higher than 100 points',
                        scoreMaximum: value => value < 10000 || 'Please enter a score lower than 9999 points',

                        answerMaximum: value => value.length <= 40 || 'Please enter an answer shorter than 40 characters',
                    },
                }
            },
        }),

    };
</script>

<style scoped>

</style>