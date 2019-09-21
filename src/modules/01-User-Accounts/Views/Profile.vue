<template>
    <v-row>
        <v-col>
            <v-card class="mx-auto"
                    max-width="70%">
                <v-toolbar flat>
                    <v-btn icon @click="handleBack">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-toolbar-title class="text-center, display-1">Profile</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                    <v-container fluid style="margin-left: 20px">
                        <v-row>
                            <v-card-title style="color: royalblue; font-size: 25px">{{user.fname}} {{user.lname}}'s profile</v-card-title>
                        </v-row>
                    </v-container>
                <v-footer></v-footer>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import {loginUtils} from "../../../main";

    export default {
        async beforeMount() {
           this.user = ((await loginUtils.checkUserExistsKey(this.$route.params.id)).user);
        },
        name: "Profile",
        methods:{
            handleBack(){
                this.$router.go(-1);
            }
        },
        data(){
            return{
                user: []
            }
        }
    }
</script>

<style scoped>

</style>