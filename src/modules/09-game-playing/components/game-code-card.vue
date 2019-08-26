<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-6" :loading="loading">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Join a game</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field placeholder="Game code" name="code" type="text" v-model="code"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="showGames = !showGames">
            <v-icon>{{ showGames ? 'mdi-arrow-up' : 'mdi-playlist-play' }}</v-icon>
          </v-btn>
          <v-btn color="primary" @click="onClickButton">Join</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-expand-transition>
          <div v-show="showGames">
            <v-card-text>
              Active sessions:
              <template v-for="token in games">
                <li v-bind:key="token">{{ token }}</li>
              </template>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    code: "",
    games: [],
    showGames: false
  }),
  mounted: function() {
    this.games=[];
    let self = this;
    const ref = this.$db.ref("/Sessions");
    ref.orderByValue().on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        self.games.push(data.child("token").val());
      });
    });
  },
  name: "game-code-card",
  methods: {
    onClickButton() {
      this.$emit("codeTry", this.code);
    }
  }
};
</script>