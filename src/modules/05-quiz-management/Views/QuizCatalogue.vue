<template>
        <v-row>
            <v-col>
                <v-card class="mx-auto"
                        max-width="90%">
                    <v-toolbar flat>
                        <v-btn icon>
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <v-toolbar-title class="text-center, display-2">Quizzes</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-container fluid>
                        <v-row>
                            <v-col v-for="quiz in quizs" cols="4">
                                <v-card>
                                    <v-img
                                            :src="quiz.img"
                                            class="white--text"
                                            height="200px"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    >
                                        <v-card-title class="align-end fill-height" v-text="quiz.quiz_title"></v-card-title>
                                    </v-img>


                                        <v-card-text>
                            <span class="text--primary">
        <span class="body-1" v-text="quiz.owner_id"></span><br>
        <span class="body-1" v-text="quiz.description"></span><br>
        <span class="body-1"></span><br>
      </span>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-btn
                                                    text
                                                    color="green"
                                            >
                                                Play
                                            </v-btn>
                                            <v-btn
                                                    text
                                                    color="orange"
                                            >
                                                Edit
                                            </v-btn>
                                            <v-btn
                                                    text
                                                    color="red"
                                            >
                                                Delete
                                            </v-btn>
                                        </v-card-actions>

                                </v-card>
                            </v-col>
                        </v-row>
                        <v-card class="elevation-6" :loading="loading">
                            <v-card-title class="align-end fill-height">Create Quiz</v-card-title>
                            <v-card-text>
                                <v-form ref="form">
                                    <v-text-field
                                        placeholder="Quiz Title"
                                        name="quiz_title"
                                        type="text"
                                        v-model="quiz_title">
                                </v-text-field>
                                <v-text-field
                                        placeholder="Owner ID"
                                        name="user_id"
                                        type="text"
                                        v-model="owner_id">
                                </v-text-field>
                                <v-text-field
                                        placeholder="Description"
                                        name="user_id"
                                        type="text"
                                        v-model="description">
                                </v-text-field>
                                    <v-card-actions class="center">
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue" @click="addnewData">Publish</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card-text>

                        </v-card>
                        <v-btn color="primary" @click="addTestData()">Add Test Quizzes</v-btn>
                    </v-container>
                    <v-footer class="mt-12"></v-footer>
                </v-card>
            </v-col>
        </v-row>

</template>



<script>

    export default {
        name: "QuizCatalogue",



        // grabbing all data on page render
        beforeMount(){
            this.getQuizzes();
        },
        quizs: [],


        methods:{
            // getting snapshot of data from firebase
            getQuizzes(){
                this.$db.ref('/Quizs').on('value', (snap) => {
                    // clear current results array each time method is called
                    var results = [];
                    this.quizs = [];
                    // convert firebase data entries into json
                    snap.forEach(entry => {
                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        // push firebase data into results array
                        results.push(entryObj);
                    });
                    // sort results by ascending order of score
                    this.quizs = results;

                });
            },
            // function to push dummy data to firebase
            addTestData(){
                this.testData.forEach(entry => {
                    this.$db.ref('/Quizs').push(entry);
                });
            },
            addnewData(){
                //this.$refs.form.forEach(entry => {
                    this.$db.ref('/Quizs').push(this.$refs.form);

            }

        },
        // dummy data
        data(){
            return {
                testData: [
                {
                    quiz_title: 'Ancient Greece Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
                    description: "A fun Quiz!",
                    owner_id: 1212,
                    flex: 12
                },
                {
                    quiz_title: 'Ancient Egypt Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
                    description: "A decent Quiz!",
                    owner_id: 3212,
                    flex: 6
                },
                {
                    quiz_title: 'Ancient China Quiz',
                    img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
                    description: "A not so fun Quiz!",
                    owner_id: 512,
                    flex: 6
                },

            ],
                quizs: [],

            }
        },
        props: {

        }

    }

</script>

<style scoped>

</style>