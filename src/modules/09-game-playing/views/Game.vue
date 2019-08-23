<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <div v-if="render === 'name'">
          <v-fade-transition >
            <nickname-entry-card @nickEnter="onNickEnter"></nickname-entry-card>
          </v-fade-transition>
        </div>

        <div v-else-if="render === 'code'">
          <v-fade-transition>
            <game-code-card @codeTry="onCodeTry"></game-code-card>
          </v-fade-transition>
        </div>

        <div v-else-if="render === 'question'">
          <v-fade-transition>
            <question-card></question-card>
          </v-fade-transition>
        </div>

        <div v-else-if="render === 'question'">
          <v-fade-transition>
            <scoreboard-card></scoreboard-card>
          </v-fade-transition>
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

export default {
  components: { GameCodeCard, NicknameEntryCard, QuestionCard, ScoreboardCard },
  props: {
    source: String
  },
  data: () => ({
    render: 'name',
    score: 0,
    player: null,
    answer: null,
    game: null
  }),
  methods: {
    onNickEnter: function(nick) {
      this.player = { nickname: nick }
      this.$db.ref('/Players').push(this.player);
      this.render = 'code';
    },
    onCodeTry: function(code) {
      var sessions = [];
      const ref = this.$db.ref("/Sessions");
      ref.orderByValue().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
          sessions.push(data.child("token").val());
        });
      });
      for (var token of sessions) {
        if (code === token) {
          console.log('y');
          this.render = 'question'
          return { valid: true, token };
        }
      }
      console.log('n');
      return { valid: false };
    }
  }
};
</script>