import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)

  function setCurrentUser(newUser) {
    currentUser.value = newUser
  }

  return { currentUser, setCurrentUser }
})
