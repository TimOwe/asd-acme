<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <span>Leaderboard</span>
      <br />
      <span class="text--primary">
        <span>1st. Player name</span>
        <br />
        <span>You came 3rd. (1400 points behind player name)</span>
      </span>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn icon @click="showFullLeaderboard = !showFullLeaderboard">
        <v-icon>{{ showFullLeaderboard ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
      </v-btn>
      <v-btn icon to='/'>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showFullLeaderboard">
        <v-card-text>
          <p>2nd. Player 2</p>
          <p>3rd. Player 3</p>
          <p>4th. Player 4</p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "scoreboard-card",
  data: () => ({
    showFullLeaderboard: false
  })
};
</script>