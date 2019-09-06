<template>
  <v-layout>
    <v-container grid-md-list>
      <v-layout class="display-2 justify-center font-weight-bold mb-3 mt-4">Welcome to Acme!</v-layout>


      <v-layout row wrap class="pt-4">
        <flex xs4 class="mr-4 mb-4">
          <v-btn to="/login">01 User Accounts</v-btn>
        </flex>
        <flex xs4 class="mr-4">
          <v-btn to="/users">03 User Administration</v-btn>
        </flex>
        <flex xs4 class="mr-4">
          <v-btn to="/quizs">04 Quiz Administration</v-btn>
        </flex>
        <flex xs3 class="mr-4">
          <v-btn to="/host">07 Host Game</v-btn>
        </flex>
        <flex xs3 class="mr-4">
          <v-btn to="/game">09 Game Playing</v-btn>
        </flex>
        <flex xs3 class="mr-4">
          <v-btn to="/leaderboard">12 Leaderboard</v-btn>
        </flex>
        <flex xs3 class="mr-4">
          <v-btn to="/quizcatalogue">05 Quiz Management</v-btn>
        </flex>
      </v-layout>

    </v-container>
  </v-layout>
</template>

<script>
export default {
    created(){
        // this.$db.ref('/Users').push('da')
    },
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
};
</script>
