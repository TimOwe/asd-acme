<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto"
                    max-width="70%">
                <v-toolbar flat>
                    <v-btn icon>
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-center, display-1">Settings</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                    <v-container fluid style="margin-left: 20px">
                        <v-row>
                           <v-card-title style="color: royalblue; font-size: 25px">Update Details:</v-card-title>
                        </v-row>
                        <v-row>
                            <v-text style="margin-left: 16px; margin-top:15px; font-size: 18px; color: green">{{updated}}</v-text>
                        </v-row>
                        <v-row>
                            <v-card-text style="font-size: 22px; padding-left: 16px">First Name:</v-card-text>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="fname" style="padding-left: 16px; max-width: 600px;" label="First Name" single-line outlined></v-text-field>
                            <v-text style="margin-left: 20px; margin-top:15px; font-size: 18px; color: red">{{fNameWarning}}</v-text>
                        </v-row>
                        <v-row>
                            <v-card-text style="font-size: 22px; margin-top: -20px; padding-left: 16px">Last Name:</v-card-text>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="lname" style="padding-left: 16px; max-width: 600px;" label="Last Name" single-line outlined></v-text-field>
                            <v-text style="margin-left: 20px; margin-top:15px; font-size: 18px; color: red">{{lNameWarning}}</v-text>
                        </v-row>
                        <v-row>
                            <v-card-text style="font-size: 22px; padding-left: 16px; margin-top: -20px;">Email Address:</v-card-text>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="email" style="padding-left: 16px; max-width: 600px;" label="Email Address" single-line outlined></v-text-field>
                            <v-text style="margin-left: 20px; margin-top:15px; font-size: 18px; color: red">{{emailWarning}}</v-text>
                        </v-row>
                        <v-row>
                            <v-btn style="margin-left: 16px;" large depressed @click="changePasswordDialog = true">Change Password</v-btn>
                        </v-row>
                        <br>
                        <v-row>
                            <v-btn style="margin-left: 16px;"  color="primary" large depressed @click="save()">Save Changes</v-btn>
                        </v-row>
                        <br>
                    </v-container>
                <v-divider></v-divider>
                <v-container fluid style="margin-left: 20px">
                    <v-row>
                        <v-card-title style="color: royalblue; font-size: 25px">Delete Account:</v-card-title>
                    </v-row>
                    <v-row>
                        <v-card-text style="font-size: 18px; padding-left: 16px">If you no longer want your Acme account, you can permanently delete it. Deleting your account will remove all relevant user information from the database and you will not be able to log back into your account.</v-card-text>
                    </v-row>
                    <v-row>
                        <v-btn style="margin-left: 16px; margin-top: 10px" class="white--text"  color="red" large depressed @click="deleteAct">Delete Account</v-btn>
                    </v-row>
                </v-container>
                <v-dialog v-model="changePasswordDialog" persistent max-width="600px">
                    <ChangePasswordCard @close="UpdatePasswordChange"></ChangePasswordCard>
                </v-dialog>
                <v-footer></v-footer>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import ChangePasswordCard from "../components/Change-Password-Card";
    export default {
        name: "Settings",
        components: {ChangePasswordCard},
        methods: {
            deleteAct(){
                this.$db.ref('/Users/'+ (this.$cookies.get('user').key)).remove();
                this.$cookies.remove('user');
                this.$router.push('/');
            },

            save(){
                this.clearWarnings();
                this.updated = '';
                if(this.setWarnings()){
                    if(this.fname !== '' && this.testName(this.fname)){
                        this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/fname').set((this.fname).replace(/^\w/, c => c.toUpperCase()));
                        this.storeUser.fname = this.fname;
                    }
                    if(this.lname !== '' && this.testName(this.lname)){
                        this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/lname').set((this.lname).replace(/^\w/, c => c.toUpperCase()));
                        this.storeUser.lname = this.lname;
                    }
                    if(this.email !== '' && this.testEmail()){
                        this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/email').set(this.email);
                        this.storeUser.email = this.email;
                    }
                    this.$cookies.remove('user');
                    this.$cookies.set('user', this.storeUser, '1d');
                    this.updated = 'Your details have been updated.'
                }
            },

            setWarnings(){
                var val = true;
                if(!(this.fname === '') && !this.testName(this.fname)){
                    this.fNameWarning = 'Invalid Entry';
                    val = false;
                }
                if(!(this.lname === '') && !this.testName(this.lname)){
                    this.lNameWarning = 'Invalid Entry';
                    val = false;
                }
                if(!(this.email === '') && !this.testEmail(this.email)){
                    this.emailWarning = 'Invalid Entry';
                    val = false;
                }
                return val;
            },

            clearWarnings(){
                this.fNameWarning = '';
                this.lNameWarning ='';
                this.emailWarning='';
            },

            UpdatePasswordChange(e) {
                this.changePasswordDialog = e;
            },

            testName(name){
                var isValidName = /^[^0-9]+$/.test(name);
                return isValidName;
            },

            testEmail(){
                var isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
                return isEmailValid;
            }
        },
        data() {
            return {
                changePasswordDialog: '',
                fname: '',
                lname: '',
                email: '',
                fNameWarning: '',
                lNameWarning: '',
                emailWarning: '',
                updated: '',
                storeUser: this.$cookies.get('user')
            }
        }
    }
</script>

<style scoped>

</style>