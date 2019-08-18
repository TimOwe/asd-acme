<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <game-code-card></game-code-card>
        <nickname-entry-card></nickname-entry-card>
        <question-card></question-card>
        <scoreboard-card></scoreboard-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import GameCodeCard from "../components/game-code-card.vue";
  import NicknameEntryCard from "../components/nickname-entry-card.vue";
  import QuestionCard from "../components/question-card.vue";
  import ScoreboardCard from "../components/scoreboard-card.vue";

  export default {
    components: {GameCodeCard, NicknameEntryCard, QuestionCard, ScoreboardCard},
    props: {
      source: String,
    },
    data: () =>  ({
      score: 0,
      player: null,
      nick: null,
    }),
    methods: {
      newPlayer: (nickname) => {
        // Get this nickname from component           ------------ setNickname: (nick, player) => {}
        //Push new player to db (not yet connected)
        // Set player data object to be this player
        return nickname;
      },
      joinGame: (code, player) => {
        // get sessions from db (not yet connected)
        let sessions = [];
        sessions.forEach((session) => {
          if (code == session) {
            // push player to game's session in db
            return true;
          }
          return false;
        }
        )
      },
      answer: (a) => {
        // check database for correct answer
        let answer = null // some call to db for correct answer
        if (a == answer) {
          // get player's current score, add points if correct
        return {result: true, points: 100}
        }
        // Return that they got it wrong, and the correct answer
        return {result: false, correct: 'a'}
      },
      finalScore: () => {
        // Some db call to get array of players and their scores
        // Sorting algorithm, return to scoreboard component
      }
    }
  }
</script>