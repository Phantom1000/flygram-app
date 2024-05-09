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
import { useTokenStore } from '@/store/token'
import { useFetch } from '@/composable/useFetch'
import router from './router'

const { token } = useTokenStore()
const { currentUser, setCurrentUser } = useUserStore()

const loadCurrentUser = async () => {
  if (token) {
    const { data } = await useFetch(
      'get',
      'user/current',
      {},

      {
        Authorization: `Bearer ${token}`
      }
    )
    if (data.value) {
      setCurrentUser(data.value)
    } else {
      router.replace({ name: 'logout' })
    }
  }
}

if (!currentUser) {
  loadCurrentUser()
}
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
