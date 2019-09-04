<template>
    <div>
        <v-container>
            <v-toolbar flat>
                <v-btn icon @click="onBackButton"><v-icon>mdi-arrow-left</v-icon></v-btn>
                <v-toolbar-title class="text-center, headline">Quizzes</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text color="grey darken-2"><v-icon size="35">mdi-play</v-icon></v-btn>
                <v-btn text color="grey darken-2" @click.stop="edit=true" :quiz="quiz"><v-icon size="35">mdi-pencil</v-icon></v-btn>
                <v-btn text color="grey darken-2" @click="deleteConfirm=true"><v-icon size="35">mdi-delete</v-icon></v-btn>
            </v-toolbar>
            <v-img :src="img" :aspect-ratio="16/9" class="white--text" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-container align="end" class="lightbox white--text pa-2 fill-height">
                <div class="display-4">{{quizTitle}}</div>
                </v-container>
            </v-img>

            <v-card-text>
                <span class="text--primary">
                    <span class="subtitle-1">{{description}}</span><br>
                    <span class="caption"><b>Created by: </b>{{owner}}</span><br>
                    <span class="caption">Questions: {{questions.length}}</span><br>
                </span>
            </v-card-text>

            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header class="headline">Questions</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="d-flex">
                            <v-checkbox v-model="readonly" label="Show Answers" align="end"></v-checkbox>
                        </div>
                        <v-list>
                            <v-list-group v-for="question in questions" :key="question.q" no-action link>
                                <template v-slot:activator>
                                        <v-list-item-title class="title">{{key+1}}. {{question.q}}</v-list-item-title>
                                        <v-list-item-action-text>{{question.score}} Points</v-list-item-action-text>
                                </template>

                                <div v-if="readonly===true">
                                    <v-list-item-title class="body-1, pl-4">Answers</v-list-item-title>
                                    <v-list-item>
                                        <v-layout>
                                            <v-flex xs2 v-for="(n,i) in 4" :key="n">
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

        <v-dialog persistent scrollable fullscreen hide-overlay transition="dialog-bottom-transition" v-model="edit">
            <edit-card v-on:closeEdit="closeEdit" :quiz="quiz" ></edit-card>
        </v-dialog>

        <v-dialog width=350 v-model="deleteConfirm">
            <v-card>
                <v-card-title>
                    Confirm Quiz Delete
                </v-card-title>
                <v-card-text>Are you sure you want to delete this quiz?</v-card-text>
                <v-card-actions>
                    <v-layout>
                        <v-btn color="white" @click="deleteConfirm = false">Cancel</v-btn>
                        <v-btn color="red" @click="deleteQuiz(quiz.key)">Delete</v-btn>
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
    import EditCard from "../Components/edit-card";
    export default {
        name: "quiz-card",
        components: {EditCard},
        props: {
            quiz: Object
        },
        beforeMount: function(){
            this.img = this.quiz.img;
            this.quizTitle = this.quiz.quiz_title;
            this.description = this.quiz.description;
            this.owner = this.quiz.owner_id;
            this.questions = this.quiz.questions
        },
        methods: {
            deleteQuiz: function(quizKey) {
                this.deleteConfirm = false;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$db.ref('/Quizs/' + quizKey).remove();
                    this.$emit("catalogueView")
                }, 2000);

            },
            closeEdit: function(){
                this.edit=false;
                this.$emit('refresh');
            },
            answerCheck: function(c, a){
                return parseInt(c)===parseInt(a);
            },
            onBackButton() {
                this.$emit("catalogueView");
            },

        },
        data: () => ({
            edit: false,
            deleteConfirm: false,
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: [],
            img: '',
            key: '',
            readonly: false,


            expanded: [],
            headers: [
                {   text: 'Question', align: 'left', sortable: false, value: 'q',},
                { text: 'Score', value: 'score' },
            ],
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%',
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%',
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%',
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%',
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%',
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%',
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%',
                },
            ],
        }),
    }
</script>

<style scoped>
    green{
        color:green;
    }



</style>