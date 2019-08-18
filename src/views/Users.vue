<template>
    <v-flex>
        <v-container grid-list-md>
            <v-layout row wrap>
                <v-flex xs6 v-for="user in users" :key="user.key">
                    <v-card>
                        <v-card-title>{{user.fname}} {{user.lname}}</v-card-title>
                        <v-card-text>
                           <v-layout class="v-subheader">Email: </v-layout> <v-text-field v-model="user.email"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn large color="primary">Save</v-btn>
                            <v-btn large color="primary">Delete</v-btn>
                            <v-btn large color="primary">Logs</v-btn>
                            <v-btn large color="primary">Quiz's</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-flex>
</template>

<script>

    export default {
        data(){
            return {
                users: [{
                    key: "-Lfhjsgvkjhadfaiofhsnl",
                    fname: 'Matt',
                    lname: "MATTTTTT",
                    email: "jvhjk@ggjvhb.net"
                },{
                    key: "-Lfhjsgv896986faiofhsnl",
                    fname: 'FIRST',
                    lname: "last",
                    email: "j894267k@ggjvhb.net"
                }]
            }
        },
        methods: {

        }
    }
</script>