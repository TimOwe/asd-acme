<template>
    <div>

        <v-container grid-list-md>
            <v-layout justify-center align-center class="headline pb-5">Create A New Quiz</v-layout>
            <v-layout justify-center align-center>
                <v-flex xs7>
                    <v-text-field v-model="quizTitle" outlined shaped label="Quiz Title"></v-text-field>
                    <v-text-field v-model="description" outlined shaped label="Quiz Description"></v-text-field>
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
                            </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                            <v-flex xs2 v-for="(n,i) in 4" :key="n">
                                <v-text-field v-model="question.a[i]" :label="'Answer #'+ (i+1)"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-actions>
                        <v-btn v-if="index!=0" fab top right absolute color="red" @click="removeQuestion(index)"><v-icon>fa-trash</v-icon></v-btn>
                        <v-btn v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: []})"><v-icon>fa-plus</v-icon></v-btn>

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
</template>

<script>
        export default {
            methods:{
                saveQuiz(){
                    this.loading = true;
                        this.newQuiz(this.quizTitle, this.questionBank, 'Test', 'yeet', this.description);
                        this.confirm = false;
                        setTimeout(() => {
                            this.loading = false
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
                    this.questionBank = [{q: "", a: []}];
                },

                newQuiz(quiz_title, questions, owner_id, img, description){
                    var Quiz = {
                        quiz_title,
                        questions,
                        owner_id,
                        img,
                        description
                    }
                    var reciept = this.$db.ref('/Quizs').push(Quiz);
                    return reciept.key;
                }
            },
            data: () => ({
                questionBank:[{q: "", a: []}],
                quizTitle: "",
                loading: false,
                validation: false,
                confirm: false
            }),
                    };
</script>

<style scoped>

</style>