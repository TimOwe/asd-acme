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
        <span class="font-weight-light" style="font-size: large"> {{fname}} {{lname}}</span>
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
      this.fname = (this.$cookies.get('user')).fname;
      this.lname = (this.$cookies.get('user')).lname;
    },
  data: () => ({
      fname: '',
      lname: ''
  }),
};
</script>
