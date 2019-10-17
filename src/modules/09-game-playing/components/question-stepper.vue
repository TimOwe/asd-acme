<template>
  <v-stepper v-model="stepno" v-bind:value="stepno" vertical>
    <div v-for="(question, i) in questions" v-bind:key="add(i)">
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
    questions: Array,
    session: String
  },
  data: () => ({
    stepno: 1
  }),
  // When the page is loaded check what question number we start on
  mounted: function() {
    this.getStep();
  },
  methods: {
    // Used for iterating UI elements with numbers
    add: function(i) {
      return i + 1;
    },
    // Call the answer function in Game.Vue with these args when we select an answer
    onAnswer: function(correct, points, qText, ans) {
      this.$emit("answer", correct, points, qText, ans);
    },
    getStep: function() {
      // DB listener for the current question number in the database
      let self = this;
      this.$db
        .ref(`/Sessions/${this.session}/`)
        .on("value", function(snapshot) {
          if (snapshot.val().screen != 0) {
            self.stepno = snapshot.val().screen;
          }
        });
    }
  }
};
</script>