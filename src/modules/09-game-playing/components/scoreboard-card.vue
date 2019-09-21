<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <span>Results</span>
      <br />
    </v-card-text>
    <v-spacer></v-spacer>

    <v-list-item v-for="(player, i) in players" :key="player.id">
      <v-list-item-avatar>
        <span v-if="i <= 10">
          <v-icon>mdi-numeric-{{add(i)}}-circle</v-icon>
        </span>
        <span v-else>{{i}}</span>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="player.name"></v-list-item-title>
      </v-list-item-content>

      <v-list-item-action-text>
        <span v-if="i == 0">
          <v-icon>mdi-trophy-award</v-icon>
        </span>
        <span v-if="i == 0">
          <v-chip color="amber accent-2">{{player.score}}</v-chip>
        </span>
        <span v-else-if="i == 1">
          <v-chip color="grey lighten-1">{{player.score}}</v-chip>
        </span>
        <span v-else-if="i == 2">
          <v-chip color="brown lighten-1">{{player.score}}</v-chip>
        </span>
        <span v-else>
          <v-chip color="purple lighten-4">{{player.score}}</v-chip>
        </span>
      </v-list-item-action-text>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "scoreboard-card",
  props: {
    game: Object,
    thisplayer: String
  },
  data: () => ({
    players: []
  }),
  mounted: function() {
    let self = this;
    var playersref = this.$db.ref(`/Sessions/${this.game.id}/players/`);
    playersref.on("value", function(snapshot) {
      self.players = [];
      snapshot.forEach(function(childSnapshot) {
        self.players.push({
          id: childSnapshot.key,
          name: childSnapshot.val().nickname,
          score: childSnapshot.val().score
        });
        self.players.sort((a, b) => b.score - a.score);
      });
    });
  },
  methods: {
    add: function(i) {
      // used for rendering numbers
      return i + 1;
    }
  }
};
</script>