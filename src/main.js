import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import router from '@/router'
import '@/assets/css/styles.css'
import components from '@/components/UI'

const pinia = createPinia()
const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

app.use(router).use(pinia).mount('#app')
