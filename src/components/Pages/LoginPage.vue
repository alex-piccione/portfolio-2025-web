<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
    <div v-if="loginError" class="error-message">{{ loginError }}</div>
  </form>
  <button @click="goBack">Return Back</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AccountProvider from '../../providers/AccountProvider';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const email = ref<string>('');
    const password = ref<string>('');
    const loginError = ref<string | null>(null);

    const handleLogin = async () => {
      try {
        loginError.value = null;
        await AccountProvider.login(email.value, password.value);
        console.log('Login successful!');
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Login failed:', error);
        loginError.value = 'Invalid email or password.';
      }
    };

    const goBack = () => {
      router.go(-1); // Navigate back to the previous page
    };

    return {
      handleLogin,
      email,
      password,
      loginError,
      goBack,
    };
  },
});
</script>

<style scoped lang="scss">
@use "/src/styles/_variables.scss";
@use "/src/styles/_general.scss";
</style>

