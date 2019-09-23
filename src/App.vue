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
  </v-app>
</template>

<script>
    import {loginUtils} from "./main";
    export default {
        name: 'App',
        async created() {
            if(this.$cookies.isKey('user') && (await loginUtils.checkUserExistsKey(this.$cookies.get('user').key).user) === undefined){
                this.$cookies.remove('user');
            }
        },

        data() {
            return {}
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