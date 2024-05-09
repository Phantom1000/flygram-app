import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref(localStorage.getItem('token') ?? sessionStorage.getItem('token'))

  const setToken = (newToken, rememberMe) => {
    token.value = newToken
    if (rememberMe) {
      localStorage.setItem('token', newToken)
    } else {
      sessionStorage.setItem('token', newToken)
    }
  }

  return { token, setToken }
})
