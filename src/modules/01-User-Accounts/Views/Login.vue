<template>
        <v-content>
            <v-container>
                <login-register-card></login-register-card>
            </v-container>
        </v-content>
</template>

<script>
    import LoginRegisterCard from "../components/login-register-card";
    export default {
        name: "Login",
        components: {LoginRegisterCard}
    }
</script>