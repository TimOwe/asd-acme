<template>
    <v-flex>
        <v-container grid-list-md>
            <v-layout>
                <v-flex xs6>
                    <v-text-field hide-details prepend-inner-icon="mdi-magnify" single-line append-icon="mdi-close" v-model="searchTerm" @click:append="resetSearch()" placeholder="Search for a User"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs6 v-for="user in filteredList" :key="user.key">
                    <v-card>
                        <v-card-title>{{user.fname}} {{user.lname}}</v-card-title>
                        <v-card-text>
                            <v-layout class="v-subheader">Email: </v-layout> <v-text-field v-model="user.email"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn depressed large color="red" class="white--text" @click="deleteUser(user.key)">Delete</v-btn>
                            <v-btn depressed large color="primary" @click="handleShowLogs(user.key)">View Logs</v-btn>
                            <v-btn depressed v-if="user.isAdmin === false" @click="handleMakeAdmin(user.key, true)" large color="purple" class="white--text">Make Admin</v-btn>
                            <v-btn depressed v-else @click="handleMakeAdmin(user.key, false)" large color="purple" class="white--text">Remove Admin</v-btn>
                            <v-btn depressed large color="cyan" class="white--text" @click="handleShowProfile(user.key)">View Profile</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-dialog width="350" v-model="LogsDialog">
            <LogTable :user-key="active" :logs="activeLogs"></LogTable>
        </v-dialog>
    </v-flex>
</template>
<script>
    import LogTable from "../components/log-table";

    export default {
        beforeMount() {
            this.$db.ref('/Users').on('value', (snap) => {
                this.users = [];
                snap.forEach(user => {
                    var userObj = user.val();
                    userObj.key = user.key;
                    this.users.push(userObj);
                })
            })

        },
        name: "log-table",
        components: {LogTable},
        data() {
            return {
                password: '',
                LogsDialog: false,
                done: false,
                confirm: false,
                activeLogs: [],
                users: [],
                active: '',
                searchTerm: ''
            }
        },

        methods: {
            deleteUser(userKey) {
                this.$db.ref('/Users/' + userKey).remove();
            },
            async handleShowLogs(userKey) {
                this.active = userKey;
                var logs = await this.getUserLogs(userKey);
                this.activeLogs = logs;
                this.LogsDialog = true;
            },
            getUserLogs(userkey) {
                return new Promise((resolve) => {
                    var logs = [];
                    this.$db.ref('/Users/' + userkey + '/Logs').once('value', (snap) => {
                        snap.forEach(log => {
                            var logObj = log.val();
                            logObj.key = log.key;
                            logs.push(logObj);
                        });
                        resolve(logs);
                    })
                })
            },
            handleMakeAdmin(user, bool){
                this.$db.ref('/Users/'+ user + '/isAdmin').set(bool);
            },
            handleShowProfile(key){
                this.$router.push({path: `/profile/${key}`})
            }
        },
        computed: {
            filteredList() {
                if(!!this.searchTerm){
                    return this.users.filter(user => {
                        return user.fname.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.lname.toLowerCase().includes(this.searchTerm.toLowerCase())

                    })
                } else {
                    return this.users
                }
            }
        }
    }
</script>
Collapse




