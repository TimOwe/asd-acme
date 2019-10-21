<template>
    <div>
        <v-layout justify-center align-center class="headline pt-5 pb-5">Welcome Back - {{activeUser.fname}}</v-layout>
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

        <v-dialog v-model="invalid" max-width="290">
            <v-card>
                <v-card-title>
                    <v-layout justify-center> Meta Data Invalid!</v-layout>
                </v-card-title>
                <v-card-text>
                    <v-layout justify-center class="headline pt-3">Meta fields must be numeric and Quiz must be valid</v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn fab absolute bottom right @click="invalid = false">X</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "Host",
        async beforeMount(){
            //get all quizes
            //set listener for firebase
            this.$db.ref('/Quizs').on('value', (snap) => {
                this.names = [];
                this.keys = [];
                snap.forEach(quiz => {
                    var quizObj = quiz.val();
                    quizObj.key = quiz.key;
                    //get object value regardless of latency
                    this.names.push(quizObj.quiz_title);
                    this.keys.push(quizObj.key);
                })
            });
            //get auth user key from cookie
            var key = this.$cookies.get('user').key;
            var template = await this.$db.ref(`/Users/${key}`).once('value');
            this.activeUser = template.val();
            //if the key exists or is valid
            if(!!key){
                this.host = key;
            }
            if(this.$route.params.name!==undefined){
                this.selected = this.$route.params.name;
            }
        },
        methods:{
            Session(quizkey,host,meta){
                //session constructor
                //generate a new token, does a check for existing tokens
                this.lastToken = this.newToken();
                var quiz;
                //set the quiz value on change
                this.$db.ref('/Quizs/'+quizkey).once('value', (snap) => {
                    quiz = snap.val();
                });
                return {
                    //total object returned to get pushed
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
                //take the selected quiz
                var index = this.names.indexOf(this.selected);
                if(this.isValid(index)){
                    //start the live session
                    this.startSession(this.keys[index], this.host, {
                        max: this.maxppl,
                        tlimit: this.tlimit
                    });
                    this.dialog=true
                } else {
                    this.invalid = true;
                }

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
            },
            isValid(index){
                var isMetaNumeric = /^[0-9]*$/.test(this.maxppl) && /^[0-9]*$/.test(this.tlimit)
                var isQuizValid = !!this.keys[index];
                return isMetaNumeric && isQuizValid
            }
        },
        data(){
            return {
                quizNames: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
                dialog: false,
                activeUser: {},
                host: '',
                names: [],
                keys: [],
                selected: "",
                lastToken: '',
                tlimit: 0,
                maxppl: 0,
                invalid: false
            }
        }
    }
</script>

<style scoped>

</style>