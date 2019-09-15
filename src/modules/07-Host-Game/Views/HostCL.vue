<template>
    <div>
        <v-layout class="headline pt-7 pb-5" justify-center>Quiz:</v-layout>
        <v-layout class="headline pt-7 pb-5" justify-center>Game Code: {{sessionKey}}</v-layout>

        <v-layout justify-center>
            <v-btn color="red" style="color:white;">End Game</v-btn>
            <v-btn color="blue" style="color:white;" class="ml-4">End Game</v-btn>
        </v-layout>

        <v-layout justify-center class="headline pt-5">Joined Users</v-layout>

        <v-container grid-md-list>
            <v-layout row wrap class="pa-3">
                <v-flex  v-for="user in participants" xs4>
                    <v-btn depressed color="blue" class="white--text mb-5">{{user.displayName}}</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
    export default {
        name: "HostCL",
        beforeMount(){
            this.sessionKey = this.$route.params.id;
            this.getSessionFromToken(this.sessionKey);
        },
        data(){
            return {
                sessionKey: '',
                participants: [],
                sessions: []
            }
        },
        methods: {
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
        }
    }
</script>

<style scoped>

</style>