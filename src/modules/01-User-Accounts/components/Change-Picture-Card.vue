<template>
    <v-card>
        <v-card-title>
            <v-layout class="headline justify-center align-center">Change Picture</v-layout>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-img v-bind:src="displayImg" v-bind:max-height="maxHeight" contain></v-img>
                    <v-flex xs12>
                        <v-text-field v-model="imgUrl" label="Image Url" type="url" required></v-text-field>
                    </v-flex>
                    <div v-if="validMessage !== ''">
                        <span style="margin-left: 3px; color: red">{{validMessage}}</span>
                    </div>
                    <v-flex xs12>
                        <v-btn style="float: right; margin-right: -10px" color="blue darken-1" text @click="previewImage()">Preview</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
                <v-btn color="blue darken-1" text @click="handleSave()">Save</v-btn>
            </v-card-actions>
        </v-card-text>
        <v-dialog width=350 v-model="done">
            <ChangedCard validation-text="Your picture has been successfully changed." @close="closeDone"></ChangedCard>
        </v-dialog>
    </v-card>
</template>
<script>
    import ChangedCard from '../components/Changed-card'
    export default {
        name: "Change-Password-Card",
        components: {ChangedCard},
        props:['activeUser'],
        methods: {
            //Closes the dialog box
            closeDialog(){
                this.$emit('close')
            },

            //Previews the image
            previewImage(){
                this.clearValidation();
                if(this.isValid()){
                    this.displayImg = this.imgUrl;
                }
                else{
                    this.validMessage = 'Please enter a valid Url'
                }
            },

            //Handles the save button press
            handleSave(){
                this.clearValidation();
                if(this.isValid()){
                    this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/picture').set(this.imgUrl);
                    this.$cookies.remove('user');
                    this.storeUser.picture = this.imgUrl;
                    var user = {key: this.storeUser.key}
                    this.$cookies.set('user', user, '1d');
                    this.done  = true;
                }
                else{
                    this.validMessage = 'Please enter a valid Url'
                }
            },

            //Clears the validation
            clearValidation(){
                this.validMessage = '';
            },

            //CLoses the done popup and the dialog
            closeDone(e) {
                this.done = e;
                this.$emit('close');
            },

            //Check's if the url is valid
            isValid(){
                return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(this.imgUrl);
            }
        },
        data() {
            return {
                validMessage: '',
                done: false,
                imgUrl: '',
                displayImg: this.activeUser.picture,
                maxHeight: (document.body.clientHeight) - 500,
                storeUser: this.$cookies.get('user')
            }
        }
    }
</script>

<style scoped>

</style>