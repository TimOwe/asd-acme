<template>
  <div>
    <v-layout class="headline pt-7 pb-5" justify-center>Quiz: {{quizTitle}}</v-layout>
    <v-layout class="headline pt-7 pb-5" justify-center>Game Code: {{sessionKey}}</v-layout>

    <v-layout justify-center>
      <v-btn color="blue" style="color:white;" @click="start">Start Game</v-btn>
      <v-btn color="red" style="color:white;" @click="end">End Game</v-btn>
    </v-layout>

    <v-layout justify-center class="headline pt-5">Joined Users</v-layout>

    <v-container grid-md-list>
      <v-layout row wrap class="pa-3">
        <v-flex v-for="user in participants" xs4>
          <v-btn depressed color="blue" class="white--text mb-5">{{user.nick}}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HostCL",
  beforeMount() {
    this.sessionKey = this.$route.params.id;
    this.getSessionFromToken(this.sessionKey);
  },
  data() {
    return {
      sessionKey: "",
      participants: [],
      quizTitle: "",
      currentSession: null
    };
  },
  methods: {
    getSessionFromToken(token) {
      let self = this;
      this.$db.ref("/Sessions").once("value", snap => {
        snap.forEach(session => {
          var sessionObj = session.val();
          sessionObj.key = session.key;
          if (sessionObj.token === token) {
            self.currentSession = sessionObj;
          }
        });
        this.$db
          .ref("/Sessions/" + self.currentSession.key + "/players")
          .on("value", snap => {
            this.participants = [];
            snap.forEach(user => {
              this.participants.push(user.val());
            });
          });
        this.$db
          .ref(`/Sessions/${self.currentSession.key}/quiz`)
          .once("value")
          .then(function(snapshot) {
            self.quizTitle = snapshot.val().quiz_title;
          });
      });
    },
    end: function() {
      this.$db.ref(`/Sessions/${this.currentSession.key}/`).update({
        timeend: Date.now()
      });
    },
    start: function() {
      this.$db.ref(`/Sessions/${this.currentSession.key}/`).update({
        timestart: Date.now()
      });
    }
  }
};
</script>

<style scoped>
</style>