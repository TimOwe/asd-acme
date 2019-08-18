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
            <v-card>
                <v-card-title>
                    <v-layout class="headline justify-center align-center">Register New User</v-layout>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="fname" label="First name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  v-model="lname" label="Last name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field  v-model="email" label="Email" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field  v-model="password" label="Password" type="password" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                        v-model="age"
                                        :items="['0-17', '18-29', '30-54', '54+']"
                                        label="Age*"
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="registerDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="handleRegister()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    const md5 = require('md5');
    export default {
        name: "login-card-vue",
        methods:{
            handleLogin(){
                var hash = md5(this.logPass);
                if(hash == "098f6bcd4621d373cade4e832627b4f6" && this.logEmail == "test@test.com"){
                    this.login ="Login Successful";
                    this.error = '';
                }
                else {
                    this.error = "An error has occurred - User does not exist";
                    this.login='';
                }
            },

            handleRegister(){

            }
        },
        data() {
            return {
                registerDialog:false,
                loading:false,
                logEmail: '',
                logPass: '',
                fname: '',
                lname: '',
                email: '',
                password: '',
                error: '',
                login: ''
            }

        }
    }
</script>