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
    </v-app-bar>

    <v-content>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
