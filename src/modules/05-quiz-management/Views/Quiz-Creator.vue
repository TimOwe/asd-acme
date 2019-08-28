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
                                <v-text-field v-model="quizTitle" outlined shaped label="Quiz Title"></v-text-field>
                                <v-text-field v-model="description" outlined shaped label="Quiz Description"></v-text-field>
                                <v-select v-model="img"
                                        :items="items"
                                        :menu-props="{ top: true, offsetY: true }"
                                        label="Pick a Theme"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-flex v-for="(question,index) in questionBank" :key="question.id">
                        <v-container>
                            <v-card>
                                <v-card-title class="justify-center">Question {{index+1}}</v-card-title>
                                <v-container grid-md-list>
                                    <v-layout justify-center>
                                        <v-flex xs8>
                                            <v-text-field v-model="question.q" label="Question:"></v-text-field>
                                            <v-text-field v-model="question.score" label="Score:"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout justify-center>
                                        <v-flex xs2 v-for="(n,i) in 4" :key="n">
                                            <v-radio-group xs2 v-model="question.c" >
                                            <v-text-field v-model="question.a[i]" :label="'Answer #'+ n"></v-text-field>
                                            <v-radio label="" :value="i"></v-radio>
                                        </v-radio-group>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <v-card-actions>
                                    <v-btn v-if="index!=0" fab top right absolute color="red" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                                    <v-btn v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: [], c: '', score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-container grid-list-md>
                                <v-card-actions class="center">
                                    <v-spacer></v-spacer>
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
            saveQuiz(){
                this.loading = true;
                this.img = this.img+".jpg";
                this.newQuiz(this.quizTitle, this.questionBank, 'TestOwner', this.img, this.description);
                this.confirm = false;
                setTimeout(() => {
                    this.loading = false;
                    this.success = true;
                }, 2000);
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
            items: ['Dark', 'Light', 'Colourful'],
            questionBank:[{q: "", a: [], c: [0,0,0,0], score: ""}],
            quizTitle: "",
            loading: false,
            validation: false,
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