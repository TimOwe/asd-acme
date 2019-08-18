<template>
    <div>
        <v-container grid-list-md>
            <v-layout class="subheading font-weight-bold justify-center align-center pb-5">Sign In</v-layout>
            <v-layout row justify-center align-center>
                <v-flex xs4>
                    <v-text-field v-model="logEmail" label="Email"></v-text-field>
                    <!-- v-model is data binding -->
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model="logPass" label="Password" type="password"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
                <v-flex xs2>
                    <v-btn large depressed @click="handleLogin">Log-In</v-btn>
                </v-flex>
                <v-flex xs2>
                    <v-btn large depressed color="primary" @click="registerDialog=true">Register</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row justify-center align-center>
                <span style="font-size:16px; color: red">{{error}}</span>
                <span style="font-size:16px; color: green">{{login}}</span>
            </v-layout>
        </v-container>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-dialog v-model="registerDialog" persistent max-width="600px">
        <RegisterCard @close="Updatereg"></RegisterCard>
        </v-dialog>
    </div>
</template>

<script>
    import RegisterCard from "../components/Register-Card";
    const md5 = require('md5');
    var matched = [];
    export default {
        name: "login-card-vue",
        components: {RegisterCard},
        methods:{
            handleLogin(){
                var hash = md5(this.logPass);
                this.auth(hash, this.logEmail);
                if(matched.length != 0){
                    this.login ="Login Successful";
                    this.error = '';
                    matched = [];
                }
                else {
                    this.error = "An error has occurred - User does not exist";
                    this.login='';
                }

            },

            auth(password, email){
                this.testData.forEach(user => {
                    if(user.email === email && user.password === password) {
                        matched.push(user);
                    }
                })
            },

            //listener
            Updatereg(e) {
                this.registerDialog = e;
            }
        },
        data() {
            return {
                registerDialog:false,
                loading:false,
                logEmail: '',
                logPass: '',
                error: '',
                login: '',
                testData: [{
                    email: 'test@test.com',
                    password: '098f6bcd4621d373cade4e832627b4f6'

                },
                 {
                    email: 'dan@dan.com',
                    password: '9180b4da3f0c7e80975fad685f7f134e'
                 }
                ]
            }

        }
    }
</script>