// src/components/Pages/LandingPage.vue // This page is shown when no Account is
found in the session
<template>
  <p>
    <b>This website allows you to keep track of your money.</b><br /><br />
    It manages your Bank accounts, Crypto Exchanges, Pensions, and more.<br />
    It handles all fiat, crypto and stable currencies and displays their
    equivalent value in YOUR currency.<br />
    You can add deposits, withdrawals and transfers from/to your providers at
    any time, including past operations.<br />
    &dArr;&dArr; Try the application with a demo guest account to see how it
    works.<br />
  </p>
  <button @click="tryGuest" class="try">
    &star; Try the application as a guest &star;
  </button>
  <button @click="goToLogin" class="login">Log in with your account</button>
  <button @click="createAccount" class="signup">Create an account</button>
</template>

<script setup lang="ts">
import { goTo } from "@/utils/router"

const goToLogin = () => goTo("Login")

const tryGuest = () => {
  // TODO: Implement guest login logic here
  console.log("Guest login clicked")
}

const createAccount = () => {
  // TODO: Implement create account logic here
  console.log("Create account clicked")
}
</script>

<style scoped lang="scss">
@use "/src/styles/_theme.scss" as theme;
@use "/src/styles/_mixins.scss" as mix;

p {
  font-size: 130%;
  /*filter: drop-shadow(0 0 2rem #bbb);*/
}

button {
  margin: theme.$margin;
}

button.try {
  color: yellow;
}

button:hover {
  color: yellow;
}
</style>
