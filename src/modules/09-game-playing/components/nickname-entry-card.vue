<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-6" :loading="loading">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Enter a Nickname</v-toolbar-title>
          <v-spacer></v-spacer>
          <div
            v-if="this.$cookies.isKey('user')"
          >{{activeUser.fname}} {{activeUser.lname.substring(0,1)}}</div>
          <div v-else>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon large to="/login" v-on="on">
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </template>
              <span>Login</span>
            </v-tooltip>
          </div>
        </v-toolbar>

        <div v-if="this.$cookies.isKey('user')">
          <v-card-text>
            <v-form>
              <v-text-field
                :value="concatName()"
                name="guestname"
                type="text"
                v-model="nickname"
                readonly
              ></v-text-field>
            </v-form>
          </v-card-text>
        </div>

        <div v-else>
          <v-card-text>
            <v-form>
              <v-text-field placeholder="Nickname" name="guestname" type="text" v-model="nickname"></v-text-field>
            </v-form>
          </v-card-text>
        </div>

        <v-card-actions class="center">
          <v-spacer></v-spacer>
          <v-btn v-bind:disabled="nickname === ''" color="primary" @click="onClickButton">Go</v-btn>
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
    nickname: "",
    player: ""
  }),
  props:['activeUser'],
  methods: {
    onClickButton() {
      // Call nickEnter function on game.vue
      this.$emit("nickEnter", this.nickname);
    },
    concatName() {
      // DIsplay the user's details as username if they are logged in already
      let nick =
        this.activeUser.fname+
        " " +
       this.activeUser.lname.substring(0, 1);
      let nickArr = nick.toLowerCase().split(" ");
      for (var i = 0; i < nickArr.length; i++) {
        nickArr[i] =
          nickArr[i].charAt(0).toUpperCase() + nickArr[i].substring(1);
      }
      this.nickname = nickArr.join(" ");
    }
  }
};
</script>