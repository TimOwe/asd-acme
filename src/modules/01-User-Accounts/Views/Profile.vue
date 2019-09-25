<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto"
                    max-width="70%">
                <v-toolbar flat>
                    <v-btn icon @click="handleBack">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-center, display-1">Profile</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                    <v-container fluid style="margin-left: 20px">
                        <v-row>
                            <v-card-title style="color: royalblue; font-size: 25px">{{user.fname}} {{user.lname}}'s Profile:</v-card-title>
                        </v-row>
                        <v-row>
                            <v-col sm="4">
                                <div v-if="user.picture !== ''">
                                    <v-img v-bind:src=user.picture></v-img>
                                </div>
                                <div v-else>
                                    <v-img src="https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg"></v-img>
                                </div>
                            </v-col>
                            <v-divider vertical class="mx-12" ></v-divider>
                            <v-col>
                                <v-row>
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">First Name:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;" >{{user.fname}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Last Name:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.lname}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="activeUser.profile.email" style="margin-top: -25px">
                                    <v-col  sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Email:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.email}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="activeUser.profile.gamesPlayed" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Games Played:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.gamesPlayed}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="activeUser.profile.questionsAnswered" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Questions Answered:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{questionsAnswered}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="activeUser.profile.correct" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: Green">Correct Answers:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.correctQuestions}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="activeUser.profile.incorrect" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: red">Incorrect Answers:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.incorrectQuestions}}</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right:2% ">
                            <div class="flex-grow-1"></div>
                            <v-btn text style="margin-left: 0" @click="editProfile" v-if="this.$cookies.isKey('user') && (this.$route.params.id === this.$cookies.get('user').key)"><v-icon>mdi-pencil</v-icon>Edit</v-btn>
                            <v-btn text style="margin-left: 15px" color="blue" @click="viewResults(user.key)">View Results<v-icon>mdi-trophy</v-icon></v-btn>
                            <v-btn text style="margin-left: 15px" color="orange" @click="viewUserQuizzes(user.key)"><v-icon>mdi-format-list-bulleted-square</v-icon>View your Quizzes</v-btn>
                        </v-row>
                    </v-container>
                        <v-dialog v-model="editProfileCard" persistent max-width="600px">
                            <editProfileCard :activeUser="activeUser" @close="updateEditProfileCard"></editProfileCard>
                        </v-dialog>
                <v-footer></v-footer>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {loginUtils} from "../../../main";
    import editProfileCard from "../components/Edit-Profile-Card"

    export default {
        async beforeMount() {
           this.user = ((await loginUtils.checkUserExistsKey(this.$route.params.id)).user);
        },
        name: "Profile",
        components: {editProfileCard},
        props: {
            activeUser: Object
        },
        methods:{
            handleBack(){
                this.$router.go(-1);
            },
            editProfile(){
              this.editProfileCard = true;
            },
            viewResults(userKey) {
                this.$router.push({path: `/user-results/${userKey}`});
            },
            viewUserQuizzes(userKey) {
                this.$router.push({path: `/userquizzes/${userKey}`});
            },
            updateEditProfileCard(e){
                this.editProfileCard = e;
            }
        },
        data(){
            return{
                user: [],
                editProfileCard: false
            }
        },

        computed:{
            questionsAnswered : function(){
                return (this.user.correctQuestions + this.user.incorrectQuestions)
            }
        }
    }
</script>

<style scoped>

</style>