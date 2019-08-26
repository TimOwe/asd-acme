<template>
    <v-card>
        <v-toolbar flat>
            <v-btn icon @click="$emit('closeEdit')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="text-center, display-1">Edit Quiz</v-toolbar-title>
        </v-toolbar>
        <v-container>
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
                                <v-text-field v-model="question.score" label="Score:"></v-text-field>
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
                        <v-btn v-if="index!=0" fab top right absolute color="red" @click="removeQuestion(index)"><v-icon>mdi-delete</v-icon></v-btn>
                        <v-btn v-if="index+1==questionBank.length" fab bottom left absolute color="green" @click="questionBank.push({q: '', a: [], c: '', score: ''})"><v-icon>mdi-plus</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
                <v-container grid-list-md>
                    <v-card-actions class="center">
                        <v-spacer></v-spacer>
                        <v-btn v-if="index+1==questionBank.length" color="white" @click="$emit('closeEdit')">Close</v-btn>
                        <v-btn v-if="index+1==questionBank.length" color="blue" @click="confirm=true">Update Quiz</v-btn>
                    </v-card-actions>
                </v-container>
            </v-container>
        </v-flex>

        <v-dialog width=350 v-model="confirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Update
                </v-card-title>
                <v-card-text>Would you like to update this quiz with these new details?</v-card-text>
                <v-card-actions>
                    <v-layout>
                        <v-btn color="green" @click="saveQuiz">Update</v-btn>
                        <v-btn color="red" @click="confirm = false">Cancel</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-on:closeEdit="triggerClose" width=350 v-model="success">
            <v-card>
                <v-card-title>
                    Success!
                </v-card-title>
                <v-card-text>Your new quiz has been successfully updated! Click below to return to the catalogue.</v-card-text>
                <v-card-actions>
                    <v-layout justify="center">
                        <v-btn color="purple" @click="$emit('closeEdit')">Go to Catalogue</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </v-card>
</template>

<script>
    export default {
        name: "edit-card",
        props: {
            quiz: Object,
            img: String,
            quizTitle: String,
            description: String,
            owner: String,
            questionBank: Array,
        },
        methods: {
            deleteQuiz(quizKey) {
                this.$db.ref('/Quizs/' + quizKey).remove();
            },
            saveQuiz(){
                this.loading = true;
                this.updateQuiz(this.quizTitle, this.questionBank, 'TestOwner', 'testimage.jpg', this.description);
                this.confirm = false;
                setTimeout(() => {
                    this.loading = false;
                    this.success = true;
                }, 2000);
            },
            updateQuiz(quiz_title, questions, owner_id, img, description){
                this.$db.ref('/Quizs/'+this.quiz.key).update({"quiz_title": quiz_title, "questions": questions, "owner_id": owner_id, "img": img, "description": description})
            },
            removeQuestion(index){
                this.questionBank.splice(index,1);
            },
            triggerClose(){
                this.$emit('closeEdit');
            },
        },
        data: () => ({
            success: false,
            confirm: false,
            loading: false,
        }),
    }
</script>

<style scoped>

</style>