<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <!-- Enter game code box-->
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-6" :loading="loading" >
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Join a game</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      to="/login"
                      v-on="on"
                    >
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
                  </template>
                  <span>Login</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Game code"
                    name="code"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="fakeLoad">Join</v-btn>
              </v-card-actions>
            </v-card> 
          </v-col>
        </v-row>
        <!-- Enter a nickname -->
         <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-6" :loading="loading" >
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Nickname"
                    name="guestname"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="center">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="fakeLoad">Go</v-btn>
              </v-card-actions>
            </v-card> 
          </v-col>
        </v-row>
        <!-- Question Box -->
        <v-row justify="center">
            <v-col cols="12" sm="8">
            <v-card>
                <v-card-title class="primary">
                <span class="headline white--text">Question 1</span>
                <v-spacer></v-spacer>
                <span class="headline white--text"> 30</span>
                <v-icon dark large>mdi-alarm</v-icon>
                </v-card-title>

                <v-list>
                    <v-list-item @click="">
                        <v-list-item-action>
                            <v-icon>mdi-alpha-a-circle-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Option A</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item @click="">
                        <v-list-item-action>
                            <v-icon>mdi-alpha-b-circle-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Option B</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item @click="">
                        <v-list-item-action>
                            <v-icon>mdi-alpha-c-circle-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Option C</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item @click="">
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
        <!-- Scoreboard Box -->
        <template>
            <v-card
                class="mx-auto"
                max-width="344"
            >

               <v-card-text>
                    <span>Leaderboard</span><br>
                    <span class="text--primary">
                        <span>1st. Player name</span><br>
                        <span>You are 3rd. (1400 points behind player name)</span>
                    </span>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn
                        icon
                        @click="showFullLeaderboard = !showFullLeaderboard"
                    >
                        <v-icon>{{ showFullLeaderboard ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="showFullLeaderboard">
                    <v-card-text>
                        <p>2nd. Player 2</p>
                        <p>3rd. Player 3</p>
                        <p>4th. Player 4</p>

                    </v-card-text>
                </div>
                </v-expand-transition>
            </v-card>
        </template>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      loading: false,
      showFullLeaderboard: false
    }),
    methods: {
        fakeLoad() {
            this.loading = true;
            setTimeout(() => (this.loading = false), 2500)
        }
    }
  }
</script>