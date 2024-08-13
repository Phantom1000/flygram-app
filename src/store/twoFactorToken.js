import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTwoFactorToken = defineStore('twoFactorToken', () => {
  const twoFactorToken = ref(null)

  function setTwoFactorToken(token) {
    twoFactorToken.value = token
  }

  return { twoFactorToken, setTwoFactorToken }
})
