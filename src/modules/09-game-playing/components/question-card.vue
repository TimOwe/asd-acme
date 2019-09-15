<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card :loading="loading" :disabled="isAnswered">
        <v-card-title v-bind:class="colourStyle">
          <span class="headline white--text">{{questionText}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-list>
          <v-list-item-group>
            <div v-for="(ans, i) in answers" v-bind:key="ans">
              <v-divider></v-divider>

              <v-list-item @click="answer(i)">
                <v-list-item-action>
                  <v-icon>mdi-numeric-{{add(i)}}-box</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ans}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "question-card",
  props: {
    questionText: String,
    answers: Array,
    correct: Number,
    score: Number,
    index: Number
  },
  data: () => ({
    selected: null,
    loading: false,
    colourStyle: "blue",
    feedbackBar: true,
    feedbackText: "",
    isAnswered: false
  }),
  methods: {
    answer: function(a) {
      // Disable selecting another answer
      this.isAnswered = true;
      // Change colour to green if correct, call answer() on game.vue
      if (a == this.correct) {
        this.$emit("answer", true, this.score, this.questionText, a);
        this.colourStyle = "light-green";
        return;
      }
      // As above, but sets colour as red if incorrect
      this.colourStyle = "red";
      this.$emit("answer", false, 0, this.questionText, a);
      this.feedbackText = "Incorrect!";
    },
    add: function(i) {
      // used for rendering numbers
      return i + 1;
    }
  }
};
</script>