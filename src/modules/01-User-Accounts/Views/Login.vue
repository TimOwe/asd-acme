<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <login-register-card></login-register-card>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import LoginRegisterCard from "../components/login-register-card";
    export default {
        name: "Login",
        components: {LoginRegisterCard}
    }
</script>