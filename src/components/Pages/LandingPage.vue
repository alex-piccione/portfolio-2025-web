// src/components/Pages/LandingPage.vue
// This page is shown when no Account is found in the session
<template>
  <p>
    This website allows you to keep track of your money.<br />
    It manages your Bank accounts, Crypto Exchanges, Pensions, and more.<br />
    It handles all fiat, crypto, and stable currencies and displays their
    equivalent value in YOUR currency.<br />
    You can add deposits, withdrawals, and transfers to your "providers" at any
    time, including past operations.<br />
    Try the application with a pre-filled guest account to see how it works.<br />
  </p>
  <button @click="tryGuest">Try the application as a guest</button>
  <button @click="goToLogin">Log in with your account</button>
  <button @click="createAccount">Create an account</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const tryGuest = () => {
  // Implement guest login logic here
  console.log('Guest login clicked');
};

const createAccount = () => {
  // Implement create account logic here
  console.log('Create account clicked');
};
</script>

<style scoped lang="scss">
@use "/src/styles/_theme.scss" as theme;
@use "/src/styles/_mixins.scss" as mix;

p {
  font-size: 130%;
}

button {
  margin: theme.$margin;
}

button:hover {
  color: yellow;
}
</style>

