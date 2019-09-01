<template>
    <div>
        <v-layout class="headline pt-7 pb-5" justify-center>Quiz:</v-layout>
        <v-layout class="headline pt-7 pb-5" justify-center>Game Code: {{sessionKey}}</v-layout>

        <v-layout justify-center>
            <v-btn color="red" style="color:white;">End Game</v-btn>
            <v-btn color="blue" style="color:white;" class="ml-4">End Game</v-btn>
        </v-layout>

        <v-layout justify-center class="headline pt-5">Joined Users</v-layout>

    </div>
</template>

<script>
    export default {
        name: "HostCL",
        beforeMount(){
            this.sessionKey = this.$route.params.id;
        },
        data(){
            return {
                sessionKey: ''
            }
        }
    }
</script>

<style scoped>

</style>