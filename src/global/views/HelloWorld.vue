<template>
  <v-layout>
    <v-container grid-md-list>
      <v-layout class="display-2 justify-center font-weight-bold mb-3 mt-4">Welcome to Acme!</v-layout>

      <v-row>
        <v-col cols="12" sm="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text"
              height="200px"
              src="https://i.imgur.com/pqZKGnU.jpg"
            >
              <v-card-title class="align-end fill-height">Join</v-card-title>
            </v-img>
            <v-card-title>Login or sign up</v-card-title>
            <v-card-text>Create quizzes and track your statistics!</v-card-text>
            <v-card-actions>
              <v-btn outlined to="/login">Sounds Good!</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text"
              height="200px"
              src="https://i.imgur.com/KBWMGRU.jpg"
            >
              <v-card-title class="align-end fill-height">Play</v-card-title>
            </v-img>
            <v-card-title>Play quizzes online</v-card-title>
            <v-card-text>Create or join a game session to get started</v-card-text>
            <v-card-actions>
              <v-btn outlined to="/host">Host a game!</v-btn>
              <v-btn outlined to="/game">Play a game!</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mx-auto">
            <v-img
              class="white--text"
              height="200px"
              src="https://i.imgur.com/YLPwT5W.jpg"
            >
              <v-card-title class="align-end fill-height">Community</v-card-title>
            </v-img>
            <v-card-title>Quizzes made easy</v-card-title>
            <v-card-text>Browse, create or edit quizzes and view leaderboards.</v-card-text>
            <v-card-actions>
              <v-btn outlined to="/quizcatalogue">Quizzes</v-btn>
              <v-btn outlined to="/leaderboardselect">Leaderboards</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-flex xs4 class="mr-4">
          <v-btn to="/users">User Administration</v-btn>
        </v-flex>

        <v-flex xs4 class="mr-4" v-if="!!this.$cookies.get('user')">
          <v-btn to="/user-results">View Your Results</v-btn>
        </v-flex>

      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {};
</script>
