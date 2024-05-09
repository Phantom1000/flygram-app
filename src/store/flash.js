import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlashStore = defineStore('flash', () => {
  const message = ref('Приложение загрузилось')
  const show = ref(2)

  function setMessage(newMessage) {
    message.value = newMessage
  }

  function setShow(newShow) {
    show.value = newShow
  }

  return { message, show, setMessage, setShow }
})
