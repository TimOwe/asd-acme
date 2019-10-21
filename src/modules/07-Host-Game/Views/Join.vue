<template>
    <div class="animated-background">
     <v-layout justify-center align-center fill-height>
         <v-card elevation="12" height="300" width="500">
             <v-layout class="headline pt-9" justify-center>
                 Enter Token To Join
             </v-layout>
             <v-layout justify-center class="pt-12">
                 <v-flex xs8>
                <v-text-field v-model="code" label="Token Here"></v-text-field>
                 </v-flex>
             </v-layout>
             <v-card-actions>
                 <v-btn @click="checkCode()" fab absolute right bottom color="light-green"><v-icon>mdi mdi-arrow-right</v-icon></v-btn>
             </v-card-actions>
         </v-card>
     </v-layout>

        <v-dialog v-model="invalid" max-width="500">
            <v-card height="120">
                <v-card-text>
                    <v-layout justify-center fill-height class="headline pt-8">
                        <v-icon color="red" class="mr-4" large>mdi-close</v-icon>That code is invalid/expired.
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>
    export default {
        name: "Join",
        beforeMount(){
            this.setSessionCodes();
        },
        data(){
            return {
                sessions: [],
                loading:false,
                code: '',
                invalid: false
            }
        },
        methods:{
            setSessionCodes(){
                //gets a list of session codes
                var sessions = [];
                //updates on value
                this.$db.ref("/Sessions").on("value", (snap) => {
                    snap.forEach(session => {
                        sessions.push(session.val().token);
                    });
                    //sets sessions
                    this.sessions = sessions;
                });
            },
            checkCode(){
                //checks the code
                this.loading = true;
                if(this.sessions.indexOf(this.code) !== -1){
                    setTimeout(() => {
                        this.loading = false;
                        this.$router.push('/live/'+this.code);
                    },1500)
                } else {
                    setTimeout(() => {
                        this.invalid = true;
                        setTimeout(() => {
                            this.invalid = false;
                        },1200);
                        this.loading=false
                    },2000)
                }
            }
        }
    }
</script>

<style scoped>

    .animated-background {
        background: linear-gradient(174deg, #0e7280, #c76bc5, #efd316, #ef1616);
        background-size: 800% 800%;
        height:100%;

        -webkit-animation: AnimationName 5s ease infinite;
        -moz-animation: AnimationName 5s ease infinite;
        -o-animation: AnimationName 5s ease infinite;
        animation: AnimationName 5s ease infinite;

        @-webkit-keyframes AnimationName {
            0%{background-position:0% 17%}
            50%{background-position:100% 84%}
            100%{background-position:0% 17%}
        }
        @-moz-keyframes AnimationName {
            0%{background-position:0% 17%}
            50%{background-position:100% 84%}
            100%{background-position:0% 17%}
        }
        @-o-keyframes AnimationName {
            0%{background-position:0% 17%}
            50%{background-position:100% 84%}
            100%{background-position:0% 17%}
        }
        @keyframes AnimationName {
            0%{background-position:0% 17%}
            50%{background-position:100% 84%}
            100%{background-position:0% 17%}
        }
    }

</style>