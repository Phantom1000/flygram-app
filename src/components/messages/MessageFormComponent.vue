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
      <button-component type="submit" class="w-100 btn-success" :is-loading="false">
        Отправить
      </button-component>
    </div>
  </form>
</template>

<script setup>
import { watch } from 'vue'
import { useMessageForm } from '@/composable/useMessageForm.js'
import { useRoute } from 'vue-router'

const props = defineProps({
  socket: {
    required: true,
    type: Object
  }
})

const { body, submitForm, errors } = useMessageForm(props.socket)

const route = useRoute()

const sendMessage = async () => {
  submitForm(route.params.username)
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
