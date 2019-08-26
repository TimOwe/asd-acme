<template>
    <v-simple-table height="500px">
        <thead>
        <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Log Type</th>
            <th class="text-left">Action</th>

        </tr>
        </thead>
        <tbody>
            <tr v-for="log in logs" :key="JSON.stringify(log)">
                <td>{{ log.time }}</td>
                <td>{{ log.type }}</td>
                <td><v-btn @click="deleteLogs(log)" fab depressed small text>X</v-btn></td>
            </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    export default {
        name: "log-table",
        created(){
          this.updatedLogs = this.logs;
        },
        props: {
            logs: Array,
            userKey: String
        },
        data(){
            return {
                updatedLogs: []
            }
        },
        methods:{
            deleteLogs(log){
                this.updatedLogs = this.logs.splice(0,this.logs.indexOf(log));
                this.$db.ref('/Users/'+this.userKey).update({'logs' : this.updatedLogs})
            }
        }
    }
</script>

<style scoped>

</style>