<template>
    <v-card
            class="mx-auto"
            max-width="400"
    >
        <v-system-bar color="indigo darken-2"></v-system-bar>


        <v-container
                class="pa-2"
                fluid
        >
            <v-row>
                <v-col
                        v-for="card in cards"
                        :key="card.title"
                        v-bind="{ [`xs${card.flex}`]: true }"
                >
                    <v-card>
                        <v-img
                                :src="card.src"
                                class="white--text"
                                height="200px"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        >
                        <v-card-title class="align-end fill-height" v-text="card.title"></v-card-title>
                        </v-img>


                        <v-card-text>
                            <span class="text--primary">
        <span class="body-1">Quiz Description</span><br>
        <span class="caption"> Quiz Difficulty: </span>
      </span>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                    text
                                    color="green"
                            >
                                Play
                            </v-btn>
                            <v-btn
                                    text
                                    color="orange"
                            >
                                Edit
                            </v-btn>
                            <v-btn
                                    text
                                    color="red"
                            >
                                Delete
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "QuizCatalogue",

        data: () => ({
            cards: [
                { title: 'Ancient Greece Quiz', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                { title: 'Ancient Egypt Quiz', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                { title: 'Ancient China Quiz', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
            ],
        }),
    }
</script>

<style scoped>

</style>