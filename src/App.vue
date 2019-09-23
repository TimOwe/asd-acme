<template>
  <v-app>
    <v-app-bar app>
      <span class="font-weight-light"> ACME</span>
        <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
        <v-btn icon to="/game"><v-icon>mdi-gamepad-square</v-icon></v-btn>
        <v-btn icon to="/leaderboardselect"><v-icon>mdi-trophy</v-icon></v-btn>
        <v-btn icon to="/quizcatalogue"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
        <div class="flex-grow-1"></div>

        <div v-if="this.$cookies.isKey('user')">
            <v-avatar v-if="this.$cookies.get('user').picture !== ''">
                <img v-bind:src="this.$cookies.get('user').picture">
            </v-avatar>
            <v-avatar v-else>
                <img src="https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg">
            </v-avatar>
            <v-btn @click="viewProfile" text class="font-weight-light" style="font-size: 16px">{{this.$cookies.get('user').fname}} {{this.$cookies.get('user').lname}}</v-btn>
            <v-btn to="/logout" text class="font-weight-light" style="font-size: medium ">Logout</v-btn>
            <v-btn name="settings" icon to="/settings">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </div>

        <div v-else>
            <v-btn to="/login" text class="font-weight-light" style="font-size: medium ">Login</v-btn>
        </div>

    </v-app-bar>

    <v-content>
     <router-view></router-view>
    </v-content>

      <v-dialog v-model="catchError" width="500">
          <v-card height="200">
              <v-layout justify-center class="headline pt-8 pb-8">
                  Warning!
              </v-layout>
              <v-card-content class="pl-12"> Fatal Error Occured. Would you like to go back home?</v-card-content>
                <v-card-actions>
                    <v-layout justify-center>
                        <v-btn text color="green" @click="$router.push('/')">Yes</v-btn>
                        <v-btn text color="red" @click="catchError=false">No</v-btn>
                    </v-layout>
                </v-card-actions>
          </v-card>
      </v-dialog>

  </v-app>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            this.$db.ref('/CatchError').on('child_added', () => {
                this.catchError = true;
            })
        },
        data() {
            return {
                catchError:false
            }
        },

        methods:{
            viewProfile(){
                this.$router.push({path: `/profile/${this.$cookies.get('user').key}`})
            }
        }
    };


</script>

<style>
    .v-dialog {
        overflow-y: auto !important
    }
</style>