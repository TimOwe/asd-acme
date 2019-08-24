<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card :loading="loading">
        <v-card-title class="primary">
          <span class="headline white--text">{{questionText}}</span>
          <v-spacer></v-spacer>
          <!--
          <span class="headline white--text">30</span>
          <v-icon dark large>mdi-alarm</v-icon> -->
        </v-card-title>
        <v-list>
          <v-list-item-group v-model="selected">
            <div v-for="(ans, i) in answers" v-bind:key="ans">
              <v-divider></v-divider>

              <v-list-item @click="answer" value="a">
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
import { setTimeout } from "timers";
export default {
  name: "question-card",
  props: {
    questionText: String,
    answers: Array
  },
  data: () => ({
    selected: null,
    loading: false
  }),
  methods: {
    answer: function() {
      this.loading = true;
    },
    add: function(i) {
      return i + 1;
    }
  }
};
</script>