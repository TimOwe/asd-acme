<template>
    <div>
        <v-container>
            <v-toolbar flat>
                <v-btn icon @click="closeEdit()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="text-center, display-1">Edit Quiz</v-toolbar-title>
            </v-toolbar>

            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs7>
                        <v-text-field v-model="quizTitle" outlined shaped label="Quiz Title"></v-text-field>
                        <v-text-field v-model="description" outlined shaped label="Quiz Description"></v-text-field>
                        <v-select v-model="img" :items="items" item-text="name" item-value="url" label="Select" return-object single-line></v-select>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container grid-list-md>
                <v-layout justify-center align-center>
                    <v-flex xs9>
                <v-card v-for="(question,index) in questionBank" :key="question.id">
                        <v-layout justify-center pt-4 class="headline">Question {{index+1}}</v-layout>

                        <v-container grid-md-list>
                            <v-layout justify-center>
                                <v-flex xs8>
                                    <v-text-field v-model="question.q" label="Question:"></v-text-field>
                                    <v-text-field v-model.number="question.score" label="Score:" type="number"></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout justify-center>
                                <v-flex xs2 v-for="(n,i) in 4" :key="n">
                                    <v-radio-group xs2 v-model="question.c" >
                                        <v-text-field v-model="question.a[i]" :label="'Answer #'+ n"></v-text-field>
                                        <v-radio label="Correct?" :value="i"></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                        </v-container>


                    <v-card-actions>
                        <v-container>
                            <v-btn v-if="index!=0" fab top right absolute color="red" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                            <v-btn v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: [], c: [0,0,0,0], score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-container>
                    </v-card-actions>
                </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container>
                <v-layout justify-center>
                    <v-btn class="ma-2" color="white" @click="closeEdit()">Cancel</v-btn>
                    <v-btn class="ma-2" color="primary" @click="confirm=true">Update Quiz</v-btn>
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
                    Please Fill Out All Fields Before Publishing
                </v-card-title>
                <v-card-text>Please check and ensure that every field has been filled out before publishing</v-card-text>
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

        name: "edit-card",
        props: {
            quiz: Object,

        },
        beforeMount: function(){
            this.newImg();
            this.key = this.quiz.key;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.owner = this.quiz.owner;
            this.questionBank = this.quiz.questions
        },
        methods: {
            saveQuiz: function(){
                this.loading = true;
                if(this.validCheck()) {
                    this.updateQuiz(this.quizTitle, this.questionBank, 'TestOwner', this.img.url, this.description);
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
            updateQuiz: function(quiz_title, questions, owner_id, img, description){
                this.$db.ref('/Quizs/'+this.key).update({"quiz_title": quiz_title, "questions": questions, "owner_id": owner_id, "img": img, "description": description})
            },
            removeQuestion: function(index){
                this.questionBank.splice(index,1);
            },
            newImg: function(){
                for(var i=0;i<3;i++) {
                    if (this.items[i].url === this.quiz.img) {
                        this.img = this.items[i];
                    }
                }

            },
            validCheck: function(){
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
            triggerClose: function(){
                this.$emit('closeEdit');
            },
            closeEdit: function(){
                this.$emit("refresh", this.quiz);
            },


        },
        data: () => ({
            success: false,
            confirm: false,
            loading: false,
            validation: false,
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
            key: ''
        }),
    }
</script>

<style scoped>

</style>