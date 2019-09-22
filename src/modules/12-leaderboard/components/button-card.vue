<template>
    <v-card class="mx-auto" :elevation="12" :raised="true" :width="400" :height="200">
        <v-img class="white--text" height="200px" :src="img">
            <v-card-title class="align-end fill-height">{{text}}</v-card-title>
        </v-img>
    </v-card>
</template>

<script>
    export default {
        name: "button-card",
        props: {
            img: String,
            text: String
        }
    }
</script>

<style scoped>

</style>