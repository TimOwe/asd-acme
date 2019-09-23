<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <span v-if="render ==='lobby' || render === 'question' | render === 'scoreboard'">
          <keep-alive-component @kA="keepAlive"></keep-alive-component>
        </span>

        <div v-if="render === 'name'">
          <v-slide-x-transition mode="out-in">
            <nickname-entry-card @nickEnter="onNickEnter"></nickname-entry-card>
          </v-slide-x-transition>
        </div>

        <div v-else-if="render === 'code'">
          <v-slide-x-transition mode="out-in">
            <game-code-card @codeTry="onCodeTry" v-bind:eText="codeError"></game-code-card>
          </v-slide-x-transition>
        </div>

        <div v-else-if="render === 'lobby'">
          <v-slide-x-transition mode="out-in">
            <lobby-card
              v-bind:sessionId="game.id"
              v-bind:maxPlayers="game.max"
              v-bind:token="game.token"
              v-bind:qId="game.quizId"
            ></lobby-card>
          </v-slide-x-transition>
        </div>

        <div v-else-if="render === 'question'">
          <v-slide-x-transition mode="out-in">
            <question-stepper
              @answer="onAnswer"
              v-bind:questions="questions"
              v-bind:session="game.id"
            />
          </v-slide-x-transition>
        </div>
        <div v-if="render === 'question'">
          <div class="text-center">
            <v-slide-x-transition mode="out-in">
              <v-btn class="ma-2" outlined color="indigo" @click="finishQuiz">Done</v-btn>
            </v-slide-x-transition>
          </div>
        </div>
        <v-snackbar v-model="showFeedback" :top="true" :timeout="1500">{{ feedbackText }}</v-snackbar>

        <div v-if="render === 'scoreboard'">
          <v-slide-x-transition mode="out-in">
            <scoreboard-card
              v-bind:thisplayer="playerref"
              v-bind:game="game"
              @pushScore="pushResults"
            ></scoreboard-card>
          </v-slide-x-transition>
        </div>
        <div v-if="render === 'scoreboard'">
          <div class="text-center">
            <v-slide-x-transition mode="out-in">
              <v-btn class="ma-2" outlined icon to="/">
                <v-icon>mdi-home</v-icon>
              </v-btn>
            </v-slide-x-transition>
          </div>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import GameCodeCard from "../components/game-code-card.vue";
import NicknameEntryCard from "../components/nickname-entry-card.vue";
import QuestionCard from "../components/question-card.vue";
import ScoreboardCard from "../components/scoreboard-card.vue";
import LobbyCard from "../components/lobby-card.vue";
import KeepAliveComponent from "../components/keep-alive.vue";
import QuestionStepper from "../components/question-stepper.vue";
import { loginUtils } from "../../../main";

export default {
  components: {
    GameCodeCard,
    NicknameEntryCard,
    QuestionCard,
    ScoreboardCard,
    LobbyCard,
    KeepAliveComponent,
    QuestionStepper
  },
  props: {
    source: String
  },
  mounted: function() {
    this.getSessions();
  },
  data: () => ({
    render: "name",
    score: 0,
    player: null,
    playerref: null,
    answer: null,
    game: {},
    quiz: null,
    questions: [],
    showFeedback: false,
    feedbackText: null,
    codeError: null,
    sessions: null,
    storeUser: []
  }),
  beforeMount: async function() {
    if (this.$cookies.isKey("user")) {
      this.storeUser = (await loginUtils.checkUserExistsKey(
        this.$cookies.get("user").key
      )).user;
    }
  },
  methods: {
    // Creates a player
    onNickEnter: function(nick) {
      let userId = null;
      // Check if user is logged in w/ session cookie
      if (this.$cookies.isKey("user")) {
        userId = this.$cookies.get("user").key;
      }
      // Push the player to the database, includes user id if logged in
      const p = {
        nickname: nick,
        score: 0,
        user: userId,
        keepAlive: Date.now()
      };
      this.player = p;
      this.render = "code";
    },
    onCodeTry: async function(code) {
      await this.getSessions();
      // Check if entered code matches any existing session
      for (var session of this.sessions) {
        const db = this.$db;
        let self = this;
        if (code === session.child("token").val()) {
          // check if started or ended already
          if (!this.gameValid(session)) return;
          if (this.$cookies.isKey("user")) {
            this.updateDBVals();
          }
          // If so, push the player to the session's document
          self.playerref = db
            .ref("Sessions/" + session.key)
            .child("players")
            .push(self.player).key;
          // Get the ID of the quiz in this session
          await db
            .ref("Sessions/" + session.key)
            .on("value", function(snapshot) {
              self.game = {
                id: session.key,
                token: snapshot.val().token,
                quizId: snapshot.val().quiz_id,
                max: parseInt(snapshot.val().max_ppl),
                sTime: snapshot.val().timestart,
                eTime: snapshot.val().timeend
              };
            });
          // Get information from the session to push w/ results
          this.render = "lobby";
          this.getQuestions();
          this.lobbyStatusCheck(session.key);
          return;
        }
      }
      this.codeError = "Invalid game code";
    },
    getSessions: async function() {
      // Get a list of all sessions when page is loaded
      var sessions = [];
      const db = this.$db;
      // Get a list of sessions
      await db
        .ref("/Sessions")
        .orderByValue()
        .once("value", function(snapshot) {
          snapshot.forEach(function(data) {
            sessions.push(data);
          });
        });
      this.sessions = sessions;
    },
    gameValid: function(session) {
      // Check if the game has ended
      if (session.child("timeend").val() !== "null") {
        this.codeError = "This game has ended.";
        return false;
      }
      // Chceck if game has started, but not ended
      if (session.child("timestart").val() !== "null") {
        this.codeError = "This game has already started.";
        return false;
      }
      // Check if game has reached capacity
      if (
        session.child("players").numChildren() >=
        parseInt(session.child("max_ppl").val())
      ) {
        this.codeError = "This game has reached capacity.";
        return false;
      }
      return true;
    },
    lobbyStatusCheck: function(session) {
      // if max players, start
      // Check if host has manually started
      let self = this;
      this.$db.ref(`/Sessions/${session}`).on("value", function(snapshot) {
        if (snapshot.val().timestart !== "null" && self.render !== "question") {
          self.render = "question";
          self.getQuestions();
        }
        if (snapshot.val().timeend !== "null" && self.render !== "scoreboard") {
          self.render = "scoreboard";
        }
      });
    },
    getQuestions: function() {
      let questions = [];
      // Get questions from database
      var ref = this.$db.ref(`/Quizs/${this.game.quizId}/questions`);
      // Add each question to the data
      ref.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
          questions.push({
            q: data.val().q,
            a: data.val().a,
            c: data.val().c,
            score: data.val().score,
            selected: ""
          });
        });
      });
      this.questions = questions;
      // We have to declare outside of ref.once() as it changes the scope of 'this'
      console.dir(this.questions);
    },
    onAnswer: function(correct, points, qText, ans) {
      var newQuestions = this.questions.map(q => {
        // Find the relevant question
        if (q.q == qText)
          // Add the selected answer
          return Object.assign({}, q, { selected: ans });
        return q;
      });
      // Assign back to questions in data (this if for sending results to db)
      this.questions = newQuestions;

      if (correct) {
        // Update score on firebase
        this.score += points;
        const ref = this.$db.ref(
          `/Sessions/${this.game.id}/players/${this.playerref}`
        );
        ref.update({ score: this.score });
        // Show feedback text
        this.feedback(`Correct! +${points} points!`);
        if (this.$cookies.isKey("user")) {
          this.updateCorrectAnswers();
        }
        return;
      }
      // Show feedback text
      this.feedback("Incorrect!");
      if (this.$cookies.isKey("user")) {
        this.updateIncorrectAnswers();
      }
    },
    feedback: function(text) {
      this.feedbackText = text;
      this.showFeedback = true;
    },
    finishQuiz: function() {
      // Show results screen, push results to firebase if logged in
      this.render = "scoreboard";
      if (this.$cookies.isKey("user")) {
        this.pushResults();
      }
    },
    pushResults: function() {
      const ref = this.$db.ref(
        "Users/" + this.$cookies.get("user").key + "/results/"
      );
      ref.push({
        quizId: this.game.quizId,
        questions: this.questions,
        time_start: this.game.sTime,
        time_end: this.game.eTime,
        score: this.score
      });
    },
    add: function(i) {
      return i + 1;
    },
    keepAlive: function() {
      const ref = this.$db.ref(
        `/Sessions/${this.game.id}/players/${this.playerref}`
      );
      ref.update({
        keepAlive: Date.now()
      });
    },
    updateDBVals: function() {
      this.storeUser.gamesPlayed++;
      this.$db
        .ref("/Users/" + this.$cookies.get("user").key + "/gamesPlayed")
        .set(this.storeUser.gamesPlayed);
    },
    updateCorrectAnswers: function() {
      this.storeUser.correctQuestions++;
      this.$db
        .ref("/Users/" + this.$cookies.get("user").key + "/correctQuestions")
        .set(this.storeUser.correctQuestions);
    },
    updateIncorrectAnswers: function() {
      this.storeUser.incorrectQuestions++;
      this.$db
        .ref("/Users/" + this.$cookies.get("user").key + "/incorrectQuestions")
        .set(this.storeUser.incorrectQuestions);
    }
  }
};
</script>
