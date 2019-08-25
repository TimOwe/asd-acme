<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card :loading="loading" :disabled="isAnswered">
        <v-card-title v-bind:class="colourStyle">
          <span class="headline white--text">{{questionText}}</span>
          <v-spacer></v-spacer>
          <!--
          <span class="headline white--text">30</span>
          <v-icon dark large>mdi-alarm</v-icon>-->
        </v-card-title>
        <v-list>
          <v-list-item-group v-model="selected">
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
    score: Number
  },
  data: () => ({
    selected: null,
    loading: false,
    colourStyle: "blue",
    feedbackBar: true,
    feedbackText: "",
    isAnswered: false,
  }),
  methods: {
    answer: function(a) {
      this.isAnswered = true;
      if (a == this.correct) {
        this.$emit("answer", true, this.score);
        this.colourStyle = "light-green";
        return;
      }
      this.colourStyle = "red";
      this.$emit("answer", false, 0);
      this.feedbackText = `Incorrect!`;
    },
    add: function(i) {
      return i + 1;
    }
  }
};
</script>