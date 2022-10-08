import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./stores/index"

import "normalize.css"
import "./assets/css/index.css"




const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
