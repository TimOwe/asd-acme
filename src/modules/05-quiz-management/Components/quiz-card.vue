<template>
    <v-card>
        <v-img
                :src="img"
                class="white--text"
                height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
            <v-card-title class="align-end fill-height">{{title}}</v-card-title>
        </v-img>


        <v-card-text>
                            <span class="text--primary">
        <span class="body-1">{{owner}}</span><br>
        <span class="body-1">{{description}}</span><br>
        <span class="body-1"></span><br>
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
</template>

<script>
    export default {
        name: "quiz-card",
        props: {
            img: String,
            title: String,
            description: String,
            owner: String
        }
    }
</script>

<style scoped>

</style>