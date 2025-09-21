<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" placeholder="Email" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" placeholder="Password" />
    </div>
    <div class="button-group">
      <button type="submit" class="login-button">Login</button>
      <button type="button" class="return-button" @click="goBack">Return Back</button>
    </div>
  </form>
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

.login-form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &.login-button {
        background-color: #007bff;
        color: white;
      }

      &.return-button {
        background-color: #6c757d;
        color: white;
      }
    }
  }
}
</style>