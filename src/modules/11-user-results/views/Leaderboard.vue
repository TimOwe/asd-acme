<template>
    <div>
    <v-simple-table height="500px">
        <thead>
        <tr>
            <th class="text-left">Rank #</th>
            <th class="text-left">User ID</th>
            <th class="text-left">Score</th>
            <th class="text-left">Time (mins)</th>
        </tr>
        </thead>
        <tbody>
        <!-- display sortedresults array in table -->
        <tr v-for="(result,index) in sortedResults">
            <td>{{index + 1}}</td>
            <td>{{ result.user_key }}</td>
            <td>{{ result.score * 100 }}%</td>
            <td>{{new Date(result.timeend - result.timestart).getSeconds()}}</td>
        </tr>
        </tbody>
    </v-simple-table>
        <v-btn color="primary" @click="addTestData()">Add Test Data</v-btn>
    </div>
</template>

<script>
    export default {
        name: "leaderboard",
        // grabbing all data on page render
        beforeMount(){
            this.getLeaderBoard();
            },
        methods:{
            // getting snapshot of data from firebase
            getLeaderBoard(){
                this.$db.ref('/Leaderboard').on('value', (snap) => {
                    // clear current results array each time method is called
                    var results = [];
                    this.sortedResults = [];
                    // convert firebase data entries into json
                    snap.forEach(entry => {
                        var entryObj = entry.val();
                        entryObj.key = entry.key;
                        // push firebase data into results array
                        results.push(entryObj);
                    });
                    // sort results by ascending order of score
                    this.sortedResults = results.sort((a,b) => b.score - a.score)
                });
            },
            // function to push dummy data to firebase
            addTestData(){
                this.testData.forEach(entry => {
                    this.$db.ref('/Leaderboard').push(entry);
                });
            }

        },
        // dummy data
        data(){
            return {
                testData: [{
                    key: '-L376r782kba',
                    user_key: '-L783tgydiuab',
                    quiz_key: '111',
                    score: 0.49,
                    timestart: 1566105295428,
                    timeend: 1566106140989
                },
                    {
                        key: '-L3790uji9kba',
                        user_key: '-L783hbsbkfuab',
                        quiz_key: '111',
                        score: 0.87,
                        timestart: 1566105295428,
                        timeend: 1566105314583
                    },
                    {
                        key: '-L377894gh9a',
                        quiz_key: '222',
                        user_key: '-L783fhsiuab',
                        score: 0.76,
                        timestart: 1566105295428,
                        timeend: 1566105314583
                    }],
                sortedResults: [],
            }
        },
        props: {

        }
    }
</script>

<style scoped>

</style>