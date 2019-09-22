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
import {loginUtils} from "../../../main";
export default {
  components: { GameCodeCard, NicknameEntryCard, QuestionCard, ScoreboardCard },
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
    sTime: null,
    eTime: null,
    codeError: null,
    sessions: null,
    storeUser: []
  }),
  beforeMount: async function() {
    this.storeUser = ((await loginUtils.checkUserExistsKey(this.$cookies.get('user').key)).user);
  },
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
    },
    onCodeTry: function(code) {
      // Check if entered code matches any existing session
      for (var session of this.sessions) {
        const db = this.$db;
        if (code === session.child("token").val()) {
          this.game = session.key;
          this.updateDBVals();
          let quiz;
          let sTime;
          let eTime;
          // If so, push the player to the session's document
          db.ref("Sessions/" + this.game)
            .child("players")
            .push(this.player);
          // Get the ID of the quiz in this session
          db.ref("Sessions/" + this.game).once("value", function(snapshot) {
            quiz = snapshot.val().quiz_id;
            sTime = snapshot.val().timestart;
            eTime = snapshot.val().timeend;
          });
          // Get information from the session to push w/ results
          this.sTime = sTime;
          this.eTIme = eTime;
          this.quiz = quiz;
          this.render = "question";
          this.getQuestions();
          return;
        }
      }
      this.codeError = "Invalid game code";
    },
    getQuestions: function() {
      let questions = [];
      // Get questions from database
      var ref = this.$db.ref(`/Quizs/${this.quiz}/questions`);
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
        quizId: this.quiz,
        questions: this.questions,
        time_start: this.sTime,
        time_end: this.eTime,
        score: this.score
      });
    },
    add: function(i) {
      return i + 1;
    },
    updateDBVals: function() {
      var played = this.storeUser.gamesPlayed + 1;
      this.$db.ref('/Users/'+ (this.$cookies.get('user').key) + '/gamesPlayed').set((played));
    }
  }
};
</script>