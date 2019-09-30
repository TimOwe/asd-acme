<template>
  <v-app>
    <v-app-bar app>
      <span class="font-weight-light"> ACME</span>
        <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
        <v-btn icon to="/game"><v-icon>mdi-gamepad-square</v-icon></v-btn>
        <v-btn icon to="/leaderboardselect"><v-icon>mdi-trophy</v-icon></v-btn>
        <v-btn icon to="/quizcatalogue"><v-icon>mdi-format-list-bulleted-square</v-icon></v-btn>
        <div class="flex-grow-1"></div>

        <div v-if="this.$cookies.get('user')">
            <v-avatar v-if="this.activeUser.picture != ''">
                <img v-bind:src="this.activeUser.picture">
            </v-avatar>
            <v-avatar v-else>
                <img src="https://www.watsonmartin.com/wp-content/uploads/2016/03/default-profile-picture.jpg">
            </v-avatar>
            <v-btn @click="viewProfile" text class="font-weight-light" style="font-size: 16px">{{activeUser.fname}} {{activeUser.lname}}</v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{on}">
                    <v-btn v-if="activeUser.isAdmin" v-on="on" text class="font-weight-light" style="font-size: 16px">Admin</v-btn>
                </template>
                <v-list>
                    <v-list-item to="/users">
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/quizs">
                        <v-list-item-title>Quizs</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn text to='/logout' class="font-weight-light" style="font-size: medium ">Logout</v-btn>
            <v-btn name="settings" icon to="/settings">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </div>

        <div v-else>
            <v-btn to="/login" text class="font-weight-light" style="font-size: medium ">Login</v-btn>
        </div>

    </v-app-bar>

    <v-content>
     <router-view :activeUser="activeUser" @login="updateData" @remove="removeData"></router-view>
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
    import {loginUtils} from "./main";

    export default {
        name: 'App',
        async created() {
            var test = (await loginUtils.checkUserExistsKey(key));
            if (this.$cookies.isKey('user') && (test.user === undefined)) {
                this.$cookies.remove('user');
                this.$router.push("/logout");
            }
            if (this.$cookies.isKey('user')) {
                this.updateData();
            }
        },
        // mounted() {
        //     this.$db.ref('/CatchError').on('child_added', () => {
        //         this.catchError = true;
        //     })
        // },
        data() {
            return {
                activeUser: {},
                catchError:false
            }
        },

        methods:{
            viewProfile(){
                this.$router.push({path: `/profile/${this.$cookies.get('user').key}`})
            },
            updateData(){
                var currentKey = this.$cookies.get('user').key;
                this.$db.ref(`/Users/${currentKey}`).on('value', (snap) => {
                    this.activeUser = snap.val();
                })
            },
            removeData(){
                this.activeUser = undefined;
            }
        }
    };
</script>
<style>
    .v-dialog {
        overflow-y: auto !important
    }
</style>