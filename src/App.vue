<template>
  <HeaderComponent />
  <main class="container">
    <FlashToastComponent />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
  <FooterComponent />
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FlashToastComponent from '@/components/FlashToastComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useUserStore } from '@/store/user'
import { useToken } from '@/composable/useToken'
import config from '@/config'
import axios from 'axios'
import router from '@/router'
import utils from '@/utils.js'

//const { token } = useTokenStore()
const { setToken, removeToken } = useToken()

const { setCurrentUser } = useUserStore()

const loadCurrentUser = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/api/token`, { withCredentials: true })
    const data = response.data
    if (data.user && data.token) {
      setCurrentUser(utils.toCamel(data.user))
      setToken(data.token)
    } else {
      router.replace({ name: 'logout' })
    }
  } catch (err) {
    setCurrentUser(null)
    await setToken(null)
    await removeToken(null)
    //router.replace({ name: 'login' })
  }
}

loadCurrentUser()
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
