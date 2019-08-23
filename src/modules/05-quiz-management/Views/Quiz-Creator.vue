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
                        <v-btn v-if="index+1==questionBank.length" fab bottom left absolute color="purple" @click="questionBank.push({q: '', a: []})"><v-icon>fa-plus</v-icon></v-btn>
                        <v-btn v-if="index+1==questionBank.length" fab bottom right absolute color="green" @click="confirm=true"><v-icon>fa-check-circle</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-flex>

        <v-dialog width=350 v-model="confirm">
            <v-card>
                <v-card-title>
                    Confirm final submission?
                </v-card-title>
                <v-card-actions>
                    <v-layout>
                        <v-btn color="green" @click="saveQuiz">Save</v-btn>
                        <v-btn color="red" @click="confirm = false">Cancel</v-btn>
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
                        this.clearScreen();
                        setTimeout(() => {
                            this.loading = false
                        }, 2000);

                },
                removeQuestion(index){
                    this.questionBank.splice(index,1);
                },
                clearScreen(){
                    this.quizTitle = '';
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