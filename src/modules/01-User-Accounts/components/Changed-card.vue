<template>
    <v-card>
        <v-card-title>
            <p>{{validationText}}</p>
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
        name: "Changed-Card",
        methods: {
            closeValidation(){
                this.$emit('close')
            }
        },
        props: ['validationText'],
    }
</script>

<style scoped>

</style>