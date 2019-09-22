<template>
    <div>
        <v-container grid-list-md>
            <v-layout class="subheading font-weight-bold justify-center align-center pb-5">Sign In</v-layout>
            <v-layout row justify-center align-center>
                <v-flex xs4>
                    <v-text-field name="logemail" v-model="logEmail" label="Email"></v-text-field>
                    <!-- v-model is data binding -->
                </v-flex>
                <v-flex xs4>
                    <v-text-field name="logpass" v-model="logPass" label="Password" type="password"></v-text-field>
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
                <span name="error" style="font-size:16px; color: red">{{error}}</span>
            </v-layout>
        </v-container>

        <v-dialog v-model="registerDialog" persistent max-width="600px">
            <RegisterCard @close="closeRegDialog"></RegisterCard>
        </v-dialog>
    </div>
</template>

<script>
    import RegisterCard from "../components/Register-Card";
    const md5 = require('md5');

    export default {
        name: "login-card-vue",
        components: {RegisterCard},
        methods:{
            //Handles when the login button is pressed
            async handleLogin(){
                var auth = await this.auth((this.logEmail).toLowerCase(), this.logPass);
                if(auth.user !== undefined){
                    this.$cookies.set('user', auth.user, '1d');
                    this.addLog(auth.user.key,'Log In');
                    this.$router.push('/');
                } else {
                    this.error = "Username or Password is Incorrect";
                }
            },

            //Adds a log. For Matt Zylstra's feature
            addLog(userKey,logType){
                this.$db.ref('/Users/'+userKey+'/Logs').push({
                    time: new Date().toISOString(),
                    type: logType
                })
            },

            //Checks if user exists in the database and email and password is correct
            async auth(email, password) {
                var authObj = {},
                    //Declaring an Object
                    matched = [],
                    //Declaring an Array
                    users = await this.getUsers();
                users.forEach((user) => {
                    if (user.email === email && user.password === md5(password)) {
                        matched.push(user);
                    }
                });
                authObj.user = matched[0];
                return authObj
            },

            //Gets users from the database
            getUsers(){
                return new Promise(resolve => {
                    var users = [];
                    this.$db.ref('/Users').once('value', (snap) => {
                    //Gets a snapshot of data, without listening for changes. 'Value' is an event.
                        snap.forEach(user => {
                            var userObj = user.val();
                            //Extracts contents of 'user' in the snapshot
                            userObj.key = user.key;
                            //Sets the key (e.g. 1)
                            users.push(userObj);
                        });
                        resolve(users);
                    });
                })
            },

            //Closes the register dialog
            closeRegDialog(e) {
                this.registerDialog = e;
            }
        },
        data() {
            return {
                registerDialog:false,
                logEmail: '',
                logPass: '',
                error: '',
            }

        }
    }
</script>