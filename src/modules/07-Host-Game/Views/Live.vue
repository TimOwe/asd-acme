<template>
    <div>
        <v-layout class="headline pt-7" justify-center>Game Code: {{sessionKey}}</v-layout>
        <v-container grid-list-md v-if="currentSession">
            <v-sheet color="blue" height="50" elevation="7" class="mt-5">
            <v-layout justify-center align-center fill-height class="pl-4 pr-4 text--white">
                <v-flex xs4>
                    <v-layout style="color:white;">Max People: {{currentSession.max_ppl}}</v-layout>
                </v-flex>
                <v-flex xs4>
                    <v-layout style="color:white;">Time Per Question: {{currentSession.max_time_pq}} sec</v-layout>
                </v-flex>
                <v-flex xs4>
                    <v-layout style="color:white;">Quiz Name: {{currentSession.quiz.quiz_title}}</v-layout>
                </v-flex>
            </v-layout>
            </v-sheet>
        </v-container>

        <v-container grid-md-list>
            <v-layout row wrap class="pa-3">
                <v-flex  v-for="user in participants" xs4>
                    <v-btn @click="$router.push('/profile/'+ $cookies.get('user').key)" depressed color="blue" class="white--text mb-5">{{user.nickname}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout justify-center align-center>
                    <v-btn v-if="isUserAdded" depressed large color="primary" @click="handleJoin()">Join Game</v-btn>
                    <v-btn class="ml-5" large>Host Info</v-btn>
            </v-layout>
        </v-container>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-dialog width="500" v-model="nickname">
            <v-layout justify-center>
            <v-card elevation="12" height="300" width="500">
                <v-layout class="headline pt-9" justify-center>
                    Enter Display Name
                </v-layout>
                <v-layout justify-center class="pt-12">
                    <v-flex xs8>
                        <v-text-field v-model="displayName" label="Name Here"></v-text-field>
                    </v-flex>
                </v-layout>
                <v-card-actions>
                    <v-btn fab absolute right bottom color="light-green" @click="addParticipant()"><v-icon>mdi mdi-arrow-right</v-icon></v-btn>
                </v-card-actions>
            </v-card>
            </v-layout>
        </v-dialog>

        <v-dialog width="500" v-model="userJoin">
            <v-layout justify-center>
                <v-card elevation="12" height="300" width="500">
                    <v-layout class="headline pt-9" justify-center>
                        Log In or Guest?
                    </v-layout>
                        <v-card-actions>
                            <v-container grid-md-list>
                                <v-layout justify-center class="pt-12">
                                    <v-flex xs2>
                                        <v-btn color="primary">Log In</v-btn>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-btn color="white" @click="nickname = true; userJoin=false">Guest</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-actions>
                </v-card>
            </v-layout>
        </v-dialog>

        <v-dialog width="500" v-model="authenticated">
            <v-layout justify-center>
                <v-card elevation="12" height="300" width="500">
                    <v-layout class="headline pt-9" justify-center>
                       Adding You To The Game...
                    </v-layout>
                    <v-card-text>
                        <v-layout justify-center class="pt-12">
                            <v-flex xs2>
                                <v-progress-circular indeterminate size="64"></v-progress-circular>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        name: "Live",
        beforeMount(){
            this.loading = true;
            this.sessionKey = this.$route.params.id;
            this.getSessionFromToken(this.sessionKey);
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            this.isActiveUser = !!this.$cookies.get('user');
        },
        data(){
            return {
                sessionKey: "",
                loading: false,
                currentSession: {
                    max_ppl: null,
                    tlimit: null,
                    quiz: {
                        quiz_title: '',
                    }
                },
                nickname: false,
                displayName: '',
                participants: [],
                isActiveUser: false,
                authenticated: false,
                userJoin: false,
            }
        },

        methods:{
            handleJoin(){
                if(this.isActiveUser){
                    this.authenticated = true;
                    this.addParticipant();
                } else {
                    this.userJoin = true;
                }
            },
            isUserAdded(){
                this.participants.forEach(user => {
                    console.log(user.key,this.$cookies.get('user').key, user.key === this.$cookies.get('user').key );
                    if(user.key === this.$cookies.get('user').key){
                        return true;
                    }
                });
                return false;
            },
            getSessionFromToken(token){
                this.$db.ref('/Sessions').once('value', (snap) => {
                    snap.forEach(session => {
                        var sessionObj = session.val();
                        sessionObj.key = session.key;
                        if(sessionObj.token === token){
                            this.currentSession = sessionObj;
                            // console.log(this.currentSession);
                        }
                    });
                    this.$db.ref('/Sessions/'+this.currentSession.key+'/players').on('value', (snap)=> {
                        this.participants = [];
                        snap.forEach(user => {
                            this.participants.push(user.val())
                        });
                        console.log(this.participants);
                    })
                });
            },
            addParticipant(){
                var sessionRef = this.$db.ref('/Sessions/'+this.currentSession.key);
                if(this.isActiveUser && !this.isUserAdded()){
                    var userObj = {
                        key: this.$cookies.get('user').key,
                        nickname: this.$cookies.get('user').fname,
                    };
                    sessionRef.child('players').push(userObj);
                    this.displayName = false;
                    this.nickname = false;
                    setTimeout(() => {
                        this.authenticated = false;
                    },500);
                } else if(this.nickname == true){
                    var userObj = {
                        key: 'guest',
                        nickname: this.displayName,
                    };
                    sessionRef.child('players').push(userObj);
                    this.displayName = false;
                    this.nickname = false;
                } else {
                    this.authenticated = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>