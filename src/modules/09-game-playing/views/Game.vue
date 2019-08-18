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
    }
  }
</script>