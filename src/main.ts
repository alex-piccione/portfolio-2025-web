import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/utils/router"
import "@/styles/_general.scss"
import "@/styles/_form.scss"
import "@/styles/_table.scss"
import App from "@/App.vue"
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount("#app")
