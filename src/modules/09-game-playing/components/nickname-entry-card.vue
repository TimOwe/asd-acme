<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-6" :loading="loading">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Enter a Nickname</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn disabled icon large to="/login" v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              placeholder="Nickname"
              name="guestname"
              type="text"
              v-model="nickname">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="center">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="onClickButton">Go</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "nickname-entry-card",
  data: () => ({
    loading: false,
    nickname: '',
    player: ''
  }),
  methods: {
    onClickButton() {
      this.$emit('nickEnter', this.nickname)
    }
  }
};
</script>