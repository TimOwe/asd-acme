<template>
  <v-card class="mx-auto" max-width="344">
    <v-card-text>
      <span>Waiting for game to start</span>
      <br />
      <span class="text--primary">
        You are waiting to play
        <span class="font-italic" name="quizTitle">{{quizTitle}}</span>
      </span>
      <br />
      <div class="text-center">
        <v-scale-transition group mode="out-in">
          <v-chip
            class="ma-2"
            outlined
            v-for="(player, i) in players"
            v-bind:key="add(i)"
          >{{player.name}}</v-chip>
        </v-scale-transition>
      </div>
    </v-card-text>
    <v-card-text class="text-center">
      <v-chip class="ma-2" color="indigo" text-color="white">
        <v-avatar left>
          <v-icon>mdi-account-supervisor-circle</v-icon>
        </v-avatar>
        {{maxPlayers}}
      </v-chip>
      <v-chip class="ma-2" color="indigo" text-color="white">
        <v-avatar left>
          <v-icon>mdi-play-circle</v-icon>
        </v-avatar>
        {{token}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "lobby-card",
  props: {
    maxPlayers: Number,
    token: String,
    sessionId: String,
    qId: String
  },
  data: () => ({
    players: [],
    quizTitle: null
  }),
  mounted: function() {
    //O On page mount get the nicknames of the players in the game
    let self = this;
    var playersref = this.$db.ref(`/Sessions/${this.sessionId}/players/`);
    playersref.on("value", function(snapshot) {
      self.players = [];
      snapshot.forEach(function(childSnapshot) {
        // Add to array
        self.players.push({ name: childSnapshot.val().nickname });
      });
    });
    // Get the Quiz Title
    this.$db.ref(`/Quizs/${this.qId}/`).once("value", function(snapshot) {
      self.quizTitle = snapshot.val().quiz_title;
    });
  },
  methods: {
    add: function(i) {
      // used for keys for user names
      if (isNaN(i)) return 1;
      return i + 1;
    }
  }
};
</script>