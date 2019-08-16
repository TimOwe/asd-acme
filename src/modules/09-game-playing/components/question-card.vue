<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card>
        <v-card-title class="primary">
          <span class="headline white--text">Question 1</span>
          <v-spacer></v-spacer>
          <span class="headline white--text">30</span>
          <v-icon dark large>mdi-alarm</v-icon>
        </v-card-title>

        <v-list>
          <v-list-item @click>
            <v-list-item-action>
              <v-icon>mdi-alpha-a-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Option A</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click>
            <v-list-item-action>
              <v-icon>mdi-alpha-b-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Option B</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click>
            <v-list-item-action>
              <v-icon>mdi-alpha-c-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Option C</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click>
            <v-list-item-action>
              <v-icon>mdi-alpha-d-circle-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Option D</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "question-card",
  data: () => ({
    showFullLeaderboard: false
  })
};
</script>