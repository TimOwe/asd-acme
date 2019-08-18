<template>
    <v-card>
        <v-toolbar dark>
            <v-toolbar-title>Results</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="$parent.$parent.$parent.dialog = false">Close</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-layout justify-center align-center row>
                <v-flex xs6>
                    {{results[0].q}}
                </v-flex>
                <v-flex xs6>
                    {{results[0].a}}
                </v-flex>
            </v-layout>
        </v-content>
    </v-card>
</template>

<script>
    export default {
        name: "results-card",
        props: {
            results: Array
        }
    }
</script>

<style scoped>

</style>