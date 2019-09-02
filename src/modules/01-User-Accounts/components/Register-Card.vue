<template>
    <v-card>
        <v-card-title>
            <v-layout class="headline justify-center align-center">Register New User</v-layout>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-text-field name="fname" v-model="fname" label="First name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field name="lname" v-model="lname" label="Last name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field name="email" v-model="email" label="Email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field name="pass" v-model="password" label="Password" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                                v-model="age"
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Age"
                                name="age"
                                required
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRegister()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="handleRegister()">Save</v-btn>
        </v-card-actions>

        <v-dialog width=350 v-model="validation">
            <ValidationCard @close="closeVal"></ValidationCard>
        </v-dialog>

        <v-dialog width=350 v-model="done">
            <CreatedCard @close="closeDone"></CreatedCard>
        </v-dialog>

    </v-card>
</template>
<script>
    import ValidationCard from "../components/Validation-Card";
    import CreatedCard from "../components/Created-Card";
    const md5 = require('md5');
    var User = function(fname,lname, dob, password, email){
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.dob = dob;
        this.isAdmin = false;
        this.password = md5(password);
    };

    export default {
        name: "Register-Card",
        components: {CreatedCard, ValidationCard},
        methods: {
            handleRegister(){
                if(this.isValid()){
                    this.newUser(this.fname ,this.lname,this.age,this.password,this.email);
                    this.done = true;
                } else {
                    this.validation = true;
                }
            },

            newUser(fname,lname,dob,password,email){
                var user = new User(fname,lname, dob, password, email);
                var reciept = this.$db.ref('/Users').push(user);
                return reciept.key;
            },

            clearScreen(){
                this.fname = '';
                this.lname = '';
                this.age = '';
                this.email = '';
                this.password = '';
            },

            closeRegister(){
                this.$emit('close')
            },

            isValid(){
                var isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
                var isValidName = /^[^0-9]+$/.test(this.fname) && /^[^0-9]+$/.test(this.lname)
                return isValidEmail && isValidName
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
                validation: false,
                done: false,
                fname: '',
                lname: '',
                email: '',
                password: '',
            }
        }
    }
</script>

<style scoped>

</style>