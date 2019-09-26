<template>
    <v-card>
        <v-card-title>
            <v-layout class="headline justify-center align-center">Edit Profile</v-layout>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-btn @click="handleSettingChange('email', true)" v-if="!activeUser.profile.email" color="green" class="white--text">Show Email Address</v-btn>
                    <v-btn @click="handleSettingChange('email', false)" v-if="activeUser.profile.email" color="red" class="white--text">Hide Email Address</v-btn>
                </v-layout>
                <v-layout wrap style="margin-top:10px">
                    <v-btn @click="handleSettingChange('gamesPlayed', true)" v-if="!activeUser.profile.gamesPlayed" color="green" class="white--text">Show Games Played</v-btn>
                    <v-btn @click="handleSettingChange('gamesPlayed', false)" v-if="activeUser.profile.gamesPlayed" color="red" class="white--text">Hide Games Played</v-btn>
                </v-layout>
                <v-layout style="margin-top: 10px" wrap>
                    <v-btn @click="handleSettingChange('questionsAnswered', true)" v-if="!activeUser.profile.questionsAnswered" color="green" class="white--text">Show Number of Questions Answered</v-btn>
                    <v-btn @click="handleSettingChange('questionsAnswered', false)" v-if="activeUser.profile.questionsAnswered" color="red" class="white--text">Hide Number of Questions Answered</v-btn>
                </v-layout>
                <v-layout style="margin-top: 10px" wrap>
                    <v-btn @click="handleSettingChange('correct', true)" v-if="!activeUser.profile.correct" color="green" class="white--text">Show Number of Correct Answers</v-btn>
                    <v-btn @click="handleSettingChange('correct', false)" v-if="activeUser.profile.correct" color="red" class="white--text">Hide Number of Correct Answers</v-btn>
                </v-layout>
                <v-layout style="margin-top: 10px" wrap>
                    <v-btn @click="handleSettingChange('incorrect', true)" v-if="!activeUser.profile.incorrect" color="green" class="white--text">Show Number of Incorrect Answers</v-btn>
                    <v-btn @click="handleSettingChange('incorrect', false)" v-if="activeUser.profile.incorrect" color="red" class="white--text">Hide Number of Incorrect Answers</v-btn>
                </v-layout>
                <v-layout style="margin-top: 10px" wrap>
                    <v-btn @click="handleSettingChange('wins', true)" v-if="!activeUser.profile.wins" color="green" class="white--text">Show Number of Wins</v-btn>
                    <v-btn @click="handleSettingChange('wins', false)" v-if="activeUser.profile.wins" color="red" class="white--text">Hide Number of Wins</v-btn>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        name: "Change-Password-Card",
        components: {},
        props: {
            activeUser: Object
        },
        methods: {
            //Handles the password change
            handleSettingChange(field, bool){
                this.$db.ref('/Users/' + this.$cookies.get('user').key + '/profile/' + field).set(bool);
            },

            //Closes the edit Profile Dialog
            closeDialog(){
                this.$emit('close')
            },

        },
        data() {
            return {
                done: false,
            }
        }
    }
</script>

<style scoped>

</style>