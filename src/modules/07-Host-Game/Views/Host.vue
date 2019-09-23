<template>
    <div>
        <v-layout justify-center align-center class="headline pt-5 pb-5">Welcome Back - Hani</v-layout>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs4>
                    Your Saved Quizes:<v-select v-model="selected" :items="names"  label="Quiz To Host" required></v-select>
                </v-flex>
                <v-flex xs4>
                    Max Participants:<v-text-field v-model="maxppl" suffix="# People"></v-text-field>
                </v-flex>
                <v-flex xs4>
                    Max Time Per Question:<v-text-field v-model="tlimit" suffix="seconds"></v-text-field>
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
                <v-card-actions>
                    <v-btn fab absolute bottom right @click="$router.push('/host/'+lastToken)"><v-icon>mdi-arrow-right</v-icon></v-btn>
                </v-card-actions>
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
            Session(quizkey,host,meta){
                this.lastToken = this.newToken();
                var quiz;
                this.$db.ref('/Quizs/'+quizkey).once('value', (snap) => {
                    quiz = snap.val();
                });
                return {
                    owner_id: host,
                    quiz_id: quizkey,
                    quiz: quiz,
                    max_ppl: meta.max,
                    max_time_pq: meta.tlimit,
                    timestart: "null",
                    timeend: 'null',
                    token: this.lastToken,
                    participants: [{}]
                }
            },
            handleStart(){
                var index = this.names.indexOf(this.selected);
                this.startSession(this.keys[index], this.host, {
                    max: this.maxppl,
                    tlimit: this.tlimit
                });
                this.dialog=true
            },
            startSession(quizkey,host, meta){
                var newSession = this.Session(quizkey,host,meta);
                this.$db.ref('/Sessions').push(newSession)
            },
            newToken(){
                var token =Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(3, 15);
                return token.substring(0,6)
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
                lastToken: '',
                tlimit: 0,
                maxppl: 0
            }
        }
    }
</script>

<style scoped>

</style>