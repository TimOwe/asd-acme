<template>
    <div v-if="render === 'quizView'"><!--Displays if render is equal to quizview-->
        <quiz-view @catalogueView="onCatalogueView" @quizEdit="onQuizEdit" @delete="onDelete" :key="editKey" :viewKey="newKey"></quiz-view>
    </div>

    <div v-else-if="render === 'editView'"><!--Displays if render is equal to quizview-->
        <edit-card @refresh="onRefresh" :quiz="this.thisQuiz" :key="refreshKey" ></edit-card>
    </div>

</template>

<script>
    import quizView from "../Components/quiz-view";
    import editCard from "../Components/edit-card";
    export default {
        name: "QuizView",
        components: {quizView, editCard},

        beforeMount: function(){
            this.newKey = this.$route.params.id;//sets the key of the quiz to the route parameter
            this.getQuiz(this.newKey)//passes the new key value to source the quiz from the database
        },

        methods:{
            // getting snapshot of data from firebase
            getQuiz: function(key){
                this.$db.ref('/Quizs/').child(key).once('value', (snap) => {
                    this.thisQuiz = snap.val();
                });
            },
            onDelete: function(quizKey) {//Deletes the quiz by locating it in firebase using its key
                this.$db.ref('/Quizs/' + quizKey).remove();
                this.$router.push('/quizcatalogue/');
            },
            onRefresh: function () {
                //this.getQuiz(updQuiz.key);//Collects new and updated data from firebase
                this.render = "quizView";
                this.getQuiz(this.newKey);
                this.forceRerender();
            },
            onQuizEdit: function() {//If called, sets the render as the edit view component, sending the viewingQuiz
                //this.viewingQuiz = quiz;
                this.render = "editView";
            },

            onCatalogueView: function() {//If called, sets render to the quizCatalogue component
                this.$router.push('/quizcatalogue/');
            },
            forceRerender() {
                //Changes key top notify vue that a change to the object has occured, forcing an update and re-render
                this.editKey += 1;
                this.refreshKey += 1;
            }
        },
        //Computed properties
        data: () => ({
            edit: false,
            deleteConfirm: false,
            thisQuiz: "",
            loading: false,
            quizTitle: '',
            description: '',
            owner: '',
            questions: [],
            img: '',
            newkey: '',
            readonly: false,
            render: "quizView",
            editKey: 0,
            refreshKey: 0,

            expanded: [],
            headers: [
                {   text: 'Question', align: 'left', sortable: false, value: 'q',},
                { text: 'Score', value: 'score' },
            ],
        }),
    }
</script>

<style scoped>
    green{
        color:green;
    }
</style>