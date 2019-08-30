<template>
    <v-simple-table height="500px">
        <thead>
        <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Log Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="log in logs" :key="JSON.stringify(log)">
            <td>{{ log.time }}</td>
            <td>{{ log.type }}</td>
        </tr>
        </tbody>
    </v-simple-table>
</template>

<script>
    export default {
        name: "log-table",
        props: {
            logs: Array
        }
    }
</script>

<style scoped>

</style>