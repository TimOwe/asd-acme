<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto"
                    max-width="70%">
                <v-toolbar flat >
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
                                <v-row v-if="user.profile.email" style="margin-top: -25px">
                                    <v-col  sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Email:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text name="email" style="font-size: 25px;">{{user.email}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="user.profile.gamesPlayed" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Games Played:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.gamesPlayed}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="user.profile.questionsAnswered" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Questions Answered:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{questionsAnswered}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="user.profile.correct" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: Green">Correct Answers:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.correctQuestions}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="user.profile.incorrect" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: red">Incorrect Answers:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.incorrectQuestions}}</v-card-text>
                                    </v-col>
                                </v-row>
                                <v-row v-if="user.profile.wins" style="margin-top: -25px">
                                    <v-col sm="5" style="margin-left: -15px;">
                                        <v-card-text style="font-size: 25px; color: royalblue">Wins:</v-card-text>
                                    </v-col>
                                    <v-col style="margin-left:-8%">
                                        <v-card-text style="font-size: 25px;">{{user.wins}}</v-card-text>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right:2% ">
                            <div class="flex-grow-1"></div>
                            <v-btn text style="margin-left: 0" @click="editProfile" v-if="this.$cookies.isKey('user') && (this.$route.params.id === this.$cookies.get('user').key)"><v-icon>mdi-pencil</v-icon>Edit</v-btn>
                            <v-btn class="white--text" style="margin-left: 15px" raised color="blue" @click="viewResults">View Results<v-icon small right color="white">mdi-chart-line</v-icon></v-btn>
                            <v-btn class="white--text" style="margin-left: 15px" raised color="orange" @click="viewUserQuizzes">View Quizzes<v-icon right color="white">mdi-format-list-bulleted-square</v-icon></v-btn>
                        </v-row>
                    </v-container>
                    <div v-if="user.profile.graphs">
                        <v-divider></v-divider>
                        <div v-if="user.gamesPlayed != 0">
                            <v-row style="margin-left: 8%">
                                <v-col>
                                    <v-card-title style="margin-left: -50px">Correct/Incorrect Question Ratio</v-card-title>
                                    <apexchart type=pie width=380 :options="correctChartOptions" :series="[user.correctQuestions, user.incorrectQuestions]"/>
                                </v-col>
                                <v-col>
                                    <v-card-title style="margin-left: 88px">Wins</v-card-title>
                                    <apexchart type=pie width=363 :options="winsChartOptions" :series="[user.wins, (user.gamesPlayed)-user.wins]"/>
                                </v-col>
                            </v-row>
                        </div>
                        <div v-else>
                            <p style="text-align: center; margin-top: 20px; color: gray">No graphs available - The user has yet to play any games!</p>
                        </div>
                    </div>
                        <v-dialog v-model="editProfileCard" persistent max-width="600px">
                            <editProfileCard :activeUser="activeUser" @close="updateEditProfileCard"></editProfileCard>
                        </v-dialog>
                <v-footer></v-footer>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import editProfileCard from "../Components/Edit-Profile-Card"
    import VueApexCharts from "vue-apexcharts"
    export default {
        beforeMount() {
            var route = "/Users/" + this.$route.params.id;
            this.$db.ref(route).on('value', (snap) => {
                this.user = snap.val();
            });
        },
        name: "Profile",
        components: {editProfileCard, apexchart: VueApexCharts},
        props: ['activeUser'],
        watch:{
            // eslint-disable-next-line no-unused-vars
            $route(to, from){
                this.$db.ref("/Users/" + this.$route.params.id).on('value', (snap) => {
                    this.user = snap.val();
                });
            }
        },
        methods:{
            handleBack(){
                this.$router.go(-1);
            },
            editProfile(){
              this.editProfileCard = true;
            },
            viewResults() {
                this.$router.push({path: "/user-results/" + this.$route.params.id});
            },
            viewUserQuizzes() {
                this.$router.push({path: "/userquizzes/" + this.$route.params.id});
            },
            updateEditProfileCard(e){
                this.editProfileCard = e;
            }
        },
        data() {
            return {
                user: {},
                editProfileCard: false,
                correctChartOptions: {
                    labels: ['Correct', 'Incorrect'],
                    colors:['#4CAF50', '#F44336'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
                winsChartOptions: {
                    labels: ['Wins', 'Loses'],
                    colors:['#7E19D5', '#1976d2'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
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