<template>
  <v-app>
    <v-app-bar app>
      <span class="font-weight-light"> ACME</span>
      <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon to="/game">
          <v-icon>mdi-gamepad-square</v-icon>
      </v-btn>
        <v-btn icon to="/leaderboard">
            <v-icon>mdi-trophy</v-icon>
        </v-btn>
        <v-btn icon to="/quizcatalogue">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
        <div class="flex-grow-1"></div>
        <div v-if="this.$cookies.isKey('user')">
            <v-btn text class="font-weight-light" style="font-size: 16px">{{this.$cookies.get('user').fname}} {{this.$cookies.get('user').lname}}</v-btn>
            <v-btn to="/logout" text class="font-weight-light" style="font-size: medium ">Logout</v-btn>
            <v-btn icon to="/settings">
                <v-icon>mdi-settings</v-icon>
            </v-btn>
        </div>
        <div v-else>
            <v-btn to="/login" text class="font-weight-light" style="font-size: medium ">Login</v-btn>
        </div>
        <div>
        </div>
    </v-app-bar>



    <v-content>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created(){
    },
  data: () => ({
  }),
};
</script>

<style>
    .v-dialog {
        overflow-y: visible !important;
    }
</style>