<template>
    <v-container>
        <v-layout justify-center fill-height>
            <v-btn large color="red" @click="run()">Run Error</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "LiveCatch",
        methods:{
            run(){
                this.$db.ref('/CatchError').push({
                    'run': 'cool'
                })
            }
        }
    }
</script>

<style scoped>

</style>