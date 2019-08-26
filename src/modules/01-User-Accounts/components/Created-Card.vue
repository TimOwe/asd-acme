<template>
    <v-card>
        <v-card-title>
            User has been created.
        </v-card-title>
        <v-card-actions>
            <v-layout>
                <v-btn color="green" @click="closeValidation()">Close</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Created-Card",
        methods: {
            closeValidation(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>