<template>
    <v-card>
        <v-card-title>
            <v-layout class="headline justify-center align-center">Change Password</v-layout>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field v-model="pass" label="New Password" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field  v-model="rpass" label="Confirm Password" type="password" required></v-text-field>
                    </v-flex>
                    <span style="margin-left: 3px; color: red">{{validation}}</span>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeChange()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="handleRegister()">Save</v-btn>
        </v-card-actions>

        <v-dialog width=350 v-model="done">
            <CreatedCard @close="closeDone"></CreatedCard>
        </v-dialog>

    </v-card>
</template>
<script>
    import CreatedCard from "../components/Created-Card";
    const md5 = require('md5');
    export default {
        name: "Change-Password-Card",
        components: {CreatedCard},
        methods: {
            handleRegister(){
                if(this.isValid()){
                    this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/password').set(md5(this.pass));
                    this.done = true;
                } else {
                    this.validation = 'Passwords do not match';
                }
            },

            clearScreen(){
                this.pass = '';
                this.rpass = '';
            },

            closeChange(){
                this.$emit('close')
            },

            isValid(){
                return this.pass === this.rpass;
            },

            closeVal(e){
                this.validation = e;
            },

            closeDone(e){
                this.done = e;
                this.$emit('close');
                this.clearScreen();
            }
        },
        data() {
            return {
                done: false,
                pass: '',
                rpass: '',
                validation: '',
            }
        }
    }
</script>

<style scoped>

</style>