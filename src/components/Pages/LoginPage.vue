<template>
    <div class="panel">
        <form class="login-form" @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username:</label>
                <input
                    v-model="email"
                    type="text"
                    id="username"
                    placeholder="Username"
                />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    placeholder="Password"
                />
            </div>
            <div class="button-group">
                <button type="submit" class="submit" :disabled="isLoading">
                    {{ isLoading ? "Logging in..." : "Login" }}
                </button>
                <button type="button" class="cancel" @click="goBack">
                    Return Back
                </button>
            </div>
            <InlineError :error="loginError" position="center" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { ref } from "vue"
import AuthService from "@/services/auth.service"
import { goTo } from "@/utils/router"
import InlineError from "@/components/InlineError.vue"
import { debug } from "@/utils/utils"

const router = useRouter()
const email = ref<string>("")
const password = ref<string>("")
const loginError = ref<string | null>(null)
const isLoading = ref<boolean>(false)

const handleLogin = async () => {
    debug("handleLogin")
    loginError.value = null
    isLoading.value = true

    try {
        const [result] = await Promise.all([
            AuthService.login(email.value, password.value),
            new Promise((resolve) => setTimeout(resolve, 500)), // Minimum 500ms
        ])
        //const result = await AuthService.login(email.value, password.value)

        if (result.isSuccess) {
            // Service handles navigation, so we don't need to do it here
            // But we can do it anyway for explicit control
            return await goTo("Home")
        } else {
            loginError.value = result.error
        }
    } catch (error: unknown) {
        loginError.value =
            error instanceof Error
                ? error.message
                : "An unexpected error occurred"
    } finally {
        isLoading.value = false
    }
}

const goBack = () => {
    router.go(-1) // Navigate back to the previous page
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

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}
</style>
