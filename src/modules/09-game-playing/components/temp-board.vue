<template>
  <v-navigation-drawer absolute right permanent>
    <v-list dense>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { loginUtils } from "../../../main";

export default {
  name: "temp-board",
  props: {
    game: Object,
    thisplayer: String,
  },
  data: () => ({
    players: []
  }),
  mounted: async function() {
    // On page load get all of the players and their scores
    let self = this;
    var playersref = this.$db.ref(`/Sessions/${this.game.id}/players/`);
    playersref.on("value", function(snapshot) {
      self.players = [];
      snapshot.forEach(function(childSnapshot) {
        self.players.push({
          id: childSnapshot.key,
          name: childSnapshot.val().nickname,
          score: childSnapshot.val().score,
        });
        //S Sort them
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