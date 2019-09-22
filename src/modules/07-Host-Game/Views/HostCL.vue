<template>
  <div>
    <v-layout justify-center>
      <v-toolbar>
        <v-toolbar-title>
          {{quizTitle}}
          <v-chip>{{sessionKey}}</v-chip>
        </v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items>
          <v-btn text @click="start" v-bind:disabled="isStarted">Start Game</v-btn>
          <v-btn text @click="end" v-bind:disabled="disableEnd">End Game</v-btn>
          <v-btn text @click="reset">Reset Game</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-layout>

    <v-layout justify-center class="headline pt-5">Joined Users</v-layout>

    <v-container grid-md-list>
      <v-layout row wrap class="pa-3">
        <v-flex v-for="user in participants" xs4>
          <v-btn depressed color="blue" class="white--text mb-5">{{user}}</v-btn>
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
      max: null,
      quizTitle: "",
      currentSession: null,
      isStarted: null,
      isEnded: null
    };
  },
  computed: {
    disableEnd: function(){
      return !this.isStarted || this.isEnded;
    }
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
          .ref(`/Sessions/${self.currentSession.key}`)
          .once("value")
          .then(function(snapshot) {
            snapshot.val().timestart == "null"
              ? (self.isStarted = false)
              : (self.isStarted = true);
            snapshot.val().timeend == "null"
              ? (self.isEnded = false)
              : (self.isEnded = true);
            self.max = snapshot.val().max_ppl;
          });
        this.$db
          .ref("/Sessions/" + self.currentSession.key + "/players")
          .on("value", snap => {
            self.participants = [];
            snap.forEach(user => {
              self.participants.push(user.val().nickname);
            });
            this.startQuiz()
          });
        this.$db
          .ref(`/Sessions/${self.currentSession.key}/quiz`)
          .once("value")
          .then(function(snapshot) {
            self.quizTitle = snapshot.val().quiz_title;
          });
        this.$db
          .ref(`/Sessions/${self.currentSession.key}`)
          .on("child_changed", function(snapshot) {
            if (snapshot.key === "timestart") {
              if (snapshot.val() !== "null") {
                self.isStarted = true;
              } else {
                self.isStarted = false;
              }
            } else if (snapshot.key === "timeend") {
              if (snapshot.val() !== "null") {
                self.isEnded = true;
              } else {
                self.isEnded = false;
              }
            }
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
    },
    reset: function() {
      this.$db.ref(`/Sessions/${this.currentSession.key}/`).update({
        timestart: "null",
        timeend: "null"
      });
    },
    startQuiz: function() {
      if (this.participants.length >= this.max && this.isStarted == false) this.start();
    },
    playQuiz: function() {
      // Advance the current question info
      // if all answered next question
      // if all questions end quiz
    },
    allAnswered: function() {
      // return true if all players have answered the current question
    },
  }
};
</script>

<style scoped>
</style>