<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-6" :loading="loading">
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
          <v-btn color="primary" @click="addPlayer">Go</v-btn>
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
    nickname: ''
  }),
  methods: {
    addPlayer() {
      this.loading = true;
      let x = Math.floor(Math.random() * 100);
      this.$db.ref('/Players').push({
        nickname: this.nickname,
        score: x,
        user_id: null
      });
      // console.log(this.nickname);
      setTimeout(() => (this.loading = false), 2500);
    }
  }
};
</script>