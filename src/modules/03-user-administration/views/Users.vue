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
                            <v-btn large color="green">Save</v-btn>
                            <v-btn depressed large color="red" class="white--text" @click="deleteUser(user.key)">Delete</v-btn>
                            <v-btn large color="primary">Logs</v-btn>
                            <v-btn large color="purple">Quiz's</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-btn @click="addTestData()">Add Dummy User</v-btn>
            </v-layout>
        </v-container>
    </v-flex>
</template>
<script>
    export default {
        beforeMount(){
            this.$db.ref('/Users').on('value', (snap) => {
                this.users = [];
                snap.forEach(user => {
                    var userObj = user.val();
                    userObj.key = user.key;
                    this.users.push(userObj);
                })
            })
        },
        data(){
            return {
                testUsers: [{
                    key: "-Lfhjsgvkjhadfaiofhsnl",
                    fname: 'Matt',
                    lname: "MATTTTTT",
                    email: "jvhjk@ggjvhb.net"
                },{
                    key: "-Lfhjsgv896986faiofhsnl",
                    fname: 'FIRST',
                    lname: "last",
                    email: "j894267k@ggjvhb.net"
                }],
                users:[]
            }
        },
        methods: {
            deleteUser(userKey){
                this.$db.ref('/Users/'+userKey).remove();
            },
            addTestData(){
                this.testUsers.forEach(user => {
                    this.$db.ref('/Users').push(user)
                });
            }
        }
    }
</script>
Collapse




