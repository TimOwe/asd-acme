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
                    <div v-if="validation !== ''">
                        <span style="margin-left: 3px; color: red">{{validation}}</span>
                    </div>
                    <div>

                    </div>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="handlePasswordChange()">Save</v-btn>
        </v-card-actions>

        <v-dialog width=350 v-model="done">
            <ChangedCard validationText="Your password has been changed successfully." @close="closeDone"></ChangedCard>
        </v-dialog>

    </v-card>
</template>
<script>
    import ChangedCard from "../components/Changed-card";
    const md5 = require('md5');
    export default {
        name: "Change-Password-Card",
        components: {ChangedCard},
        methods: {
            //Handles the password change
            handlePasswordChange(){
                this.validation = '';
                if(this.isValid() && this.isEqual()) {
                    this.$db.ref('/Users/' + (this.$cookies.get('user').key) + '/password').set(md5(this.pass));
                    this.done = true;
                }
            },

            //Removes entered text and validation
            clearScreen(){
                this.pass = '';
                this.rpass = '';
                this.validation ='';
            },

            //Closes the change password dialog
            closeDialog(){
                this.$emit('close')
                this.clearScreen();
            },

            //Checks if passwords are equal
            isEqual(){
                if(this.pass === this.rpass){
                    return true;
                }
                else{
                    this.validation = 'Passwords do not match';
                    return false;
                }
            },

            //Checks if password is between 6 and 20 characters
            isValid(){
                if((/^.{6,20}$/.test(this.pass))) {
                    return true;
                }
                else{
                    this.validation = 'Passwords must be between 6-20 characters';
                    return false;
                }
            },

            //Closes the done validation and the dialog
            closeDone(e){
                this.done = e;
                this.closeDialog();
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