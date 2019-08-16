<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-6" :loading="loading">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Join a game</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large to="/login" v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field label="Game code" name="code" type="text"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="fakeLoad">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "game-code-card",
    data: () => ({
      loading: false,
    }),
    methods: {
        fakeLoad() {
            this.loading = true;
            setTimeout(() => (this.loading = false), 2500)
        }
    }
  }
</script>