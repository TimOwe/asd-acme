<template>
    <v-card>
        <v-card-title>
            Please Fill Out All Fields Properly Before Saving
        </v-card-title>
        <v-card-actions>
            <v-layout>
                <v-btn color="red" @click="closeValidation()">Close</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Validation-Card",
        methods: {
            closeValidation(){
                this.$emit('close')
            },
        }
    }
</script>

<style scoped>

</style>