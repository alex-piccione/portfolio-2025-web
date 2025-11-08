// src/components/Pages/LandingPage.vue // This page is shown when no Account is found in the session
<template>
    <p>
        <b>This website allows you to keep track of your money.</b><br /><br />
        &SmallCircle; It manages your Bank accounts, Crypto Exchanges, Pensions, and more.<br />
        &SmallCircle; It handles all fiat, crypto and stable currencies and displays their equivalent value in YOUR currency.<br />
        <span style="display: none">&SmallCircle; You can add deposits, withdrawals and transfers from/to your providers at any time, including past operations.<br /></span>
        <br />
        <span class="try">&dArr;&dArr;&dArr;</span> Try the application with a demo guest account to see how it works.<br />
    </p>
    <div class="buttons">
        <button @click="tryGuest" class="try">&star; Try the application &star;</button>
        <button @click="createAccount" class="signup">&checkmark; Create an account &checkmark;</button>
        <button @click="goToLogin" class="login">&hearts; Log in with your account &hearts;</button>
    </div>
</template>

<script setup lang="ts">
import { goTo } from "@/utils/router"
import { debug } from "@/utils/utils"

const goToLogin = () => {
    debug("goTo login")
    goTo("Login")
}

const tryGuest = () => {
    // TODO: Implement guest login logic here
    debug("Guest login clicked")
}

const createAccount = () => {
    // TODO: Implement create account logic here
    debug("Create account clicked")
}
</script>

<style scoped lang="scss">
@use "/src/styles/_theme.scss" as theme;
@use "/src/styles/_mixins.scss" as mix;

p {
    font-size: 130%;
    /*filter: drop-shadow(0 0 2rem #bbb);*/
}

.buttons {
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
    }
}

.buttons > button {
    //flex-shrink: 1;
    //flex-grow: 1;
    flex: 1 1 0px;
    //border : solid 1px theme.$primary-color;
}

button {
    margin: theme.$margin;
}

.try {
    color: yellow;
}

.login {
    color: red;
}

.signup {
    color: greenyellow;
}
</style>
