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

        <v-container>
            <v-layout justify-center align-center>
                    <v-btn depressed large color="primary">Join Game</v-btn>
                    <v-btn class="ml-5" large>Host Info</v-btn>
            </v-layout>
        </v-container>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
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
            }, 2000)
        },
        data(){
            return {
                sessionKey: "",
                loading: false,
                currentSession: {
                    max_ppl: null,
                    tlimit: null
                }
            }
        },
        methods:{
            getSessionFromToken(token){
                this.$db.ref('/Sessions').once('value', (snap) => {
                    snap.forEach(session => {
                        var sessionObj = session.val();
                        if(sessionObj.token === token){
                            this.currentSession = sessionObj
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>