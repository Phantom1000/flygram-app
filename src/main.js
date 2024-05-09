import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import router from '@/router'
import '@/assets/css/styles.css'

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
