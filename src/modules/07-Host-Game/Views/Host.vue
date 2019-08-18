<template>
    <div>
        <v-layout justify-center align-center class="headline pt-5 pb-5">Welcome Back - Hani</v-layout>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs4>
                    Your Saved Quizes:<v-select v-model="selected" :items="names"  label="Quiz To Host" required></v-select>
                </v-flex>
                <v-flex xs4>
                    Max Participants:<v-text-field suffix="# People"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    Max Time Per Question:<v-text-field suffix="seconds"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-btn depressed color="primary" @click="handleStart()">Start Game</v-btn>
                <v-btn depressed class="white--text ml-3" color="purple" @click="addDummy()">Add Dummy Quiz</v-btn>
            </v-layout>
        </v-container>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title>
                    <v-layout justify-center> Share this code!</v-layout>
                </v-card-title>
                <v-card-text>
                    <v-layout justify-center class="headline pt-3">{{lastToken}}</v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "Host",
        beforeMount(){
            this.$db.ref('/Quizs').on('value', (snap) => {
                this.names = [];
                this.keys = [];
                snap.forEach(quiz => {
                    var quizObj = quiz.val();
                    quizObj.key = quiz.key;
                    this.names.push(quizObj.quiz_title);
                    this.keys.push(quizObj.key);
                })
            })
        },
        methods:{
            Session(quiz,host){
                this.lastToken = this.newToken();
                return {
                    owner_id: host,
                    quiz_id: quiz,
                    timestart: new Date().toString(),
                    timeend: 'null',
                    token: this.lastToken,
                    participants: [{}]
                }
            },
            handleStart(){
                var index = this.names.indexOf(this.selected);
                this.startSession(this.keys[index], this.host);
                this.dialog=true
            },
            startSession(quiz,host){
                var newSession = this.Session(quiz,host);
                this.$db.ref('/Sessions').push(newSession)
            },
            newToken(){
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(3, 5);
            },
            addDummy(){
                this.$db.ref('/Quizs').push({
                    owner_id: this.host,
                    quiz_title: 'Quiz' + Math.random(),
                    questions: [{}],
                })
            }
        },
        data(){
            return {
                quizNames: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
                dialog: false,
                host: '-L3278GJH378B',
                names: [],
                keys: [],
                selected: '',
                lastToken: ''
            }
        }
    }
</script>

<style scoped>

</style>