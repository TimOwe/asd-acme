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
import {loginUtils} from "../../../main";

export default {
  name: "scoreboard-card",
  props: {
    game: Object
  },
  data: () => ({
    players: []
  }),
  mounted: async function() {
    // When the page is loaded get all of the players names, scores and IDs
    let self = this;
    var playersref = this.$db.ref(`/Sessions/${this.game.id}/players/`);
    playersref.on("value", function(snapshot) {
      self.players = [];
      snapshot.forEach(function(childSnapshot) {
        self.players.push({
          id: childSnapshot.key,
          name: childSnapshot.val().nickname,
          score: childSnapshot.val().score,
          userId: childSnapshot.val().user
        });
        // Order them
        self.players.sort((a, b) => b.score - a.score);
      });
    });
    // Check for logged in user
    var storeUser = await loginUtils.checkUserExistsKey(self.players[0].userId)
    if(storeUser && storeUser !== undefined){
      // If logged in, add a 'win'
      this.$db
        .ref("/Users/" + self.players[0].userId + "/wins")
        .set((storeUser.user.wins) + 1)
    }
  },
  methods: {
    add: function(i) {
      // used for rendering numbers
      return i + 1;
    }
  }
};
</script>