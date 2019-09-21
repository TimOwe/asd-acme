<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
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
          <v-slide-x-transition group mode="out-in">
            <question-card
              @answer="onAnswer"
              v-for="(question, i) in questions"
              v-bind:key="add(i)"
              v-bind:index="i"
              v-bind:questionText="question.q"
              v-bind:answers="question.a"
              v-bind:correct="question.c"
              v-bind:score="question.score"
            ></question-card>
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
            <scoreboard-card v-bind:score="score"></scoreboard-card>
          </v-slide-x-transition>
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
export default {
  components: {
    GameCodeCard,
    NicknameEntryCard,
    QuestionCard,
    ScoreboardCard,
    LobbyCard
  },
  props: {
    source: String
  },
  data: () => ({
    render: "name",
    score: 0,
    player: null,
    answer: null,
    game: null,
    quiz: null,
    questions: [],
    showFeedback: false,
    feedbackText: null,
    codeError: null,
    sessions: null,
    nickn: null
  }),
  mounted: function() {
    // Get a list of all sessions when page is loaded
    var sessions = [];
    const db = this.$db;
    // Get a list of sessions
    db.ref("/Sessions")
      .orderByValue()
      .on("value", function(snapshot) {
        snapshot.forEach(function(data) {
          sessions.push(data);
        });
      });
    this.sessions = sessions;
  },
  methods: {
    // Creates a player, pushes to db
    onNickEnter: function(nick) {
      let userId = null;
      // Check if user is logged in w/ session cookie
      if (this.$cookies.isKey("user")) {
        userId = this.$cookies.get("user").key;
      }
      // Push the player to the database, includes user id if logged in
      const p = { nickname: nick, score: 0, user: userId };
      const ref = this.$db.ref("/Players");
      // Store the player id in data
      this.player = ref.push(p).key;
      this.render = "code";
      this.nickn = nick;
    },
    onCodeTry: function(code) {
      // Check if entered code matches any existing session
      for (var session of this.sessions) {
        const db = this.$db;
        let self = this;
        if (code === session.child("token").val()) {
          // check if started or ended already
          console.log("validating");
          if (!this.gameValid(session)) return;
          // If so, push the player to the session's document
          db.ref("Sessions/" + session.key)
            .child("players")
            .push({ player: this.player, nick: this.nickn });
          // Get the ID of the quiz in this session
          db.ref("Sessions/" + session.key).once("value", function(snapshot) {
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
          this.lobbyKeepAlive();
          return;
        }
      }
      this.codeError = "Invalid game code";
    },
    gameValid: function(session) {
      if (session.child("timeend").val() !== "null") {
        this.codeError = "This game has ended";
        return false;
      }
      if (session.child("timestart").val() !== "null") {
        this.codeError = "This game has already started";
        return false;
      }
      return true;
    },
    lobby: function() {
      // if max players, start
      // read db for start flag
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
      // We have to declare outside of ref.once() as it changes the scope of 'this'
      this.questions = questions;
    },
    onAnswer: function(correct, points, qText, ans) {
      var newQuestions = this.questions.map(q => {
        // Find the relevant question
        if (q.q == qText && q.c == correct)
          // Add the selected answer
          return Object.assign({}, q, { selected: ans });
        return q;
      });
      // Assign back to questions in data (this if for sending results to db)
      this.questions = newQuestions;

      if (correct) {
        // Update score on firebase
        this.score += points;
        const ref = this.$db.ref("Players/" + this.player);
        ref.update({ score: this.score });
        // Show feedback text
        this.feedback(`Correct! +${points} points!`);
        return;
      }
      // Show feedback text
      this.feedback("Incorrect!");
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
    }
  }
};
</script>