<template>
  <v-stepper v-model="stepno" v-bind:value="stepno" vertical>
    <v-btn @click="nextq()">+1</v-btn>
    <!-- debug - remove this -->

    <v-stepper-step v-bind:step="0">Waiting</v-stepper-step>
    <v-stepper-content v-bind:step="0">
      <p class="text-center">
        The game is about to start
        <br />
        <v-icon>mdi-timer-sand</v-icon>
      </p>
    </v-stepper-content>

    <div v-for="(question, i) in questions" v-bind:key="add(i)">
      <div>
        <v-stepper-step v-bind:step="i+1">Question {{i+1}}</v-stepper-step>
        <v-stepper-content v-bind:step="i+1">
          <question-card
            @answer="onAnswer"
            v-bind:questionText="question.q"
            v-bind:answers="question.a"
            v-bind:correct="question.c"
            v-bind:score="question.score"
          ></question-card>
        </v-stepper-content>
      </div>
    </div>
  </v-stepper>
</template>

<script>
import QuestionCard from "../components/question-card.vue";
export default {
  components: {
    QuestionCard
  },
  name: "question-stepper",
  props: {
    questions: Array
  },
  mounted: function() {
    this.stepno = 0;
  },
  data: () => ({
    stepno: null
  }),
  methods: {
    add: function(i) {
      return i + 1;
    },
    nextq: function() {
      this.stepno += 1;
    },
    onAnswer: function(correct, points, qText, ans) {
      this.$emit("answer", correct, points, qText, ans)
    },
  }
};
</script>