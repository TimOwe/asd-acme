<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <span>Results</span>
      <br />
      <span class="text--primary">You scored {{score}} points.</span>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn icon @click="showFullLeaderboard = !showFullLeaderboard">
        <v-icon>{{ showFullLeaderboard ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
      </v-btn>
      <v-btn icon to="/">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showFullLeaderboard">
        <v-card-text>Nothing to show here, yet.</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "scoreboard-card",
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    showFullLeaderboard: false
  })
};
</script>