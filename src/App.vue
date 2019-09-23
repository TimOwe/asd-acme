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
     <router-view :activeUser="activeUser" @login="updateData" @remove="removeData"></router-view>
    </v-content>
  </v-app>
</template>

<script>
    import {loginUtils} from "./main";

    export default {
        name: 'App',
        async created() {
            var test = (await loginUtils.checkUserExistsKey(this.$cookies.get('user').key));
            if(this.$cookies.isKey('user') && (test.user === undefined)){
                this.$cookies.remove('user');
            }
            if(this.$cookies.isKey('user')) {
                this.updateData();
            }
        },

        data() {
            return {
                activeUser: {}
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