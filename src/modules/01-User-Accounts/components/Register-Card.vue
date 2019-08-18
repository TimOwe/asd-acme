<template>
    <v-card>
        <v-card-title>
            <v-layout class="headline justify-center align-center">Register New User</v-layout>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-text-field v-model="fname" label="First name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                        <v-text-field  v-model="lname" label="Last name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field  v-model="email" label="Email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field  v-model="password" label="Password" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select
                                v-model="age"
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Age*"
                                required
                        ></v-select>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRegister()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="handleRegister()">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Register-Card",

        methods: {
            handleRegister(){

            },

            closeRegister(){
                this.$emit('close')
            },
        },
        data() {
            return {
                fname: '',
                lname: '',
                email: '',
                password: ''
            }
        }
    }
</script>

<style scoped>

</style>