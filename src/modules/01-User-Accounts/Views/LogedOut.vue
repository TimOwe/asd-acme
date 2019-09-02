<template>
    <v-app>
        <br>
        <h2 style="text-align: center">You have been successfully logged out!</h2>
        <br>
        <p style="text-align: center">You will be redirected to the home page in a moment</p>
    </v-app>
</template>

<script>
    export default {
        created() {
            if(this.$cookies.isKey('user')){
                this.$cookies.remove('user');
                setTimeout(()=>{
                    this.$router.push('/')
                },3000)
            }
           else{
                this.$router.push('/')
            }
        },
        name: "LogedOut"
    }
</script>

<style scoped>

</style>