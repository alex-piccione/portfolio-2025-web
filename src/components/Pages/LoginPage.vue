<template>
  <div class="panel">
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
      <button type="submit">Login</button>
      <button class="cancel" @click="goBack">Return Back</button>
    </div>
  </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountProviderFake from '@/providers/AccountProviderFake'
import { useRouter } from 'vue-router'
import AuthUtils from '@/utils/auth.utils'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const email = ref<string>('')
    const password = ref<string>('')
    const loginError = ref<string | null>(null)

    const handleLogin = async () => {
      try {
        loginError.value = null
        const result = await AccountProviderFake.login(email.value, password.value)
        if(result.isSuccess) {
          const {email, authToken, authTokeExpiresAt } = result.value
          AuthUtils.onLogin(email, authToken, authTokeExpiresAt)
          router.push('/dashboard')
        }
        else {
          loginError.value = result.error
        }        
      } catch (error: any) {
        loginError.value = 'Invalid email or password.'
      }
    }

    const goBack = () => {
      router.go(-1); // Navigate back to the previous page
    }

    return {
      handleLogin,
      email,
      password,
      loginError,
      goBack,
    }
  },
})
</script>

<style scoped lang="scss">
@use "/src/styles/_theme.scss" as theme;
@use "/src/styles/_mixins.scss" as mix;

.panel {
  box-shadow: theme.$box-shadow-diffuse;
}

.login-form {
  width: 300px;
  margin: 0 auto;
  padding: theme.$padding-big;

  .form-group {

    label {
      display: block;
      font-weight: 500;
      margin-bottom: theme.$margin-small;
    }

    input {
      @include mix.input;
      padding: theme.$padding-small theme.$padding; // extra lateral padding
      margin-bottom: theme.$margin;
      text-align: center;

      font-size: 110%;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .button-group {
    margin-top: theme.$margin;
    display: flex;
    justify-content: space-between;
  }
}
</style>