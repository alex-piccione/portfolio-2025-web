<template>
  <div class="panel">
  <form class="login-form" @submit.prevent="handleLogin">
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="email" type="email" id="email" placeholder="Email" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" placeholder="Password" />
    </div>
    <div class="button-group">
      <button type="submit" class="submit">Login</button>
      <button type="button" class="cancel" @click="goBack">Return Back</button>
    </div>
     <p v-if="loginError" class="error-message">{{ loginError }}</p>
  </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { goTo } from '@/utils/router'
import { debug } from '@/utils/utils'

const router = useRouter()
const email = ref<string>('')
const password = ref<string>('')
const loginError = ref<string | null>(null)

const authStore = useAuthStore()

const handleLogin = async () => {  
  debug("handleLogin")
  loginError.value = null
  const result = await authStore.login(email.value, password.value)
  
  if(result.isSuccess) {
    goTo("Dashboard")
  }
  else {
    loginError.value = result.error
  }  
}

const goBack = () => {
  router.go(-1); // Navigate back to the previous page
}

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