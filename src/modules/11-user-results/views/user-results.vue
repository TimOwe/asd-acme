<template>
    <div>
        <v-container grid-list-md>
            <v-layout justify-center class="headline pt-12">
                {{activeUser.fname}}'s Results
            </v-layout>
            <v-layout row wrap class="mt-10">
                <v-flex xs6 v-for="(attempt,ind) in attempts">
                    <v-card height="220">
                        <v-card-title>
                            Quiz Result {{ind + 1}}: {{attempt.quizId}}
                        </v-card-title>
                        <v-card-text>
                            Score: {{attempt.score}} <br>
                            Time: {{attempt.time_start}}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="showAttemptData(attempt)" fab absolute bottom left color="blue"><v-icon color="white">mdi-chart-pie</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog v-model="attemptData" width="800">
            <v-card width="800" height="600">
                <v-card-text>
                    Total Score: {{this.currentAttempt.score}} <br>
                    Time Start: {{this.currentAttempt.time_start}}
                    <v-divider class="mt-4 mb-5"></v-divider>
                        <v-simple-table fixed>
                            <thead>
                            <tr>
                                <th class="text-center">Question</th>
                                <th class="text-center">Correct</th>
                                <th class="text-center">Selected</th>
                                <th class="text-center">Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="question in currentAttempt.questions">
                                <td class="text-left">{{ question.q }}</td>
                                <td class="text-center">{{ question.a[question.c] }}</td>
                                <td class="text-center">{{ !question.a[question.selected] ? 'Not Selected' : question.a[question.selected]}}</td>
                                <td class="text-center">{{ question.score }}</td>
                            </tr>
                            </tbody>
                        </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn color="blue" large text>Replay Quiz</v-btn>
                        <v-btn color="red" large text @click="attemptData = false">Close</v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </div>
</template>

<script>
    export default {
        name: "user-results",
        beforeMount() {
            this.loading = true;
            var userKey = this.$route.params.id;
            this.$db.ref(`/Users/${userKey}`).once('value', (snap) => {
                this.activeUser = snap.val();
                this.attempts = Object.values(this.activeUser.results);
                setTimeout(() => {
                    this.loading = false
                }, 500)
            })
        },
        methods: {
            showAttemptData(attempt) {
                this.currentAttempt = attempt;
                this.attemptData = true;
            },
        },
        data(){
            return {
                activeUser: {},
                attempts: {},
                currentAttempt: {},
                attemptData: false,
                loading: false
            }
        }
    }

</script>

<style scoped>

</style>