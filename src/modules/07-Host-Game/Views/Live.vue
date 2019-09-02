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
                    <v-btn depressed color="blue" class="white--text mb-5">{{user.displayName}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout justify-center align-center>
                    <v-btn depressed large color="primary" @click="nickname = true">Join Game</v-btn>
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
                participants: []
            }
        },
        methods:{
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
                    this.$db.ref('/Sessions/'+this.currentSession.key+'/participants').on('value', (snap)=> {
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
                var userObj = {
                    key: '-L73yuhduaih7839',
                    displayName: this.displayName
                };
                    sessionRef.child('participants').push(userObj);
                    this.displayName = false;
                this.nickname = false;
            }
        }
    }
</script>

<style scoped>

</style>