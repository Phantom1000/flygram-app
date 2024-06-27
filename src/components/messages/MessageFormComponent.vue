<template>
  <form
    class="text-center w-100 mb-5"
    @submit.prevent="sendMessage"
    novalidate
    enctype="multipart/form-data"
  >
    <div class="mb-2">
      <label for="messageBody" class="form-label" v-show="false">Текст</label>
      <textarea-component
        id="messageBody"
        v-model="body"
        placeholder="Напишите сообщение..."
        :errors="errors.body ?? []"
        :height="50"
        :rows="1"
        :focus="true"
      ></textarea-component>
    </div>
    <div class="col-lg-12 d-flex mt-3">
      <button-component type="submit" class="w-100 btn-success" :is-loading="isLoading">
        Отправить
      </button-component>
    </div>
  </form>
</template>

<script setup>
import { watch } from 'vue'
import { useMessageForm } from '@/composable/useMessageForm.js'
import { useRoute } from 'vue-router'

const { body, submitForm, errors, isLoading } = useMessageForm()

const emit = defineEmits(['addMessage'])
const route = useRoute()

const sendMessage = async () => {
  const newMessage = await submitForm(route.params.username)
  if (newMessage) {
    emit('addMessage', newMessage)
  }
}

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('messageBody').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`message${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
