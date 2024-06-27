<template>
  <form class="text-center w-100 mb-5" @submit.prevent="addComment" novalidate>
    <div class="mb-2">
      <label for="commentText" class="form-label" v-show="false">Текст комментария</label>
      <textarea-component
        id="commentText"
        v-model="text"
        placeholder="Написать комментарий..."
        :errors="errors.text ?? []"
      ></textarea-component>
    </div>
    <div class="col-lg-12 d-flex mt-3">
      <button-component type="submit" class="w-100 btn-success" :is-loading="isLoading">
        {{ comment === null ? 'Отправить' : 'Сохранить' }}
      </button-component>
      <button class="w-100 btn btn-danger ms-4" @click="emit('cancel')" v-if="comment !== null">
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup>
import { inject, toRef, watch } from 'vue'
import { useCommentForm } from '@/composable/useCommentForm.js'

const props = defineProps({
  comment: {
    required: true
  }
})

const comment = toRef(() => props.comment)

const post = inject('post')

const { text, newComment, submitForm, errors, isLoading } = useCommentForm(props.comment)

const emit = defineEmits(['addComment', 'updateComment', 'cancel'])

const addComment = async () => {
  await submitForm(post.value.id, props.comment)
  if (errors.value.length === 0) {
    if (props.comment !== null) {
      emit('updateComment', newComment.value)
      text.value = ''
    } else {
      emit('addComment', newComment.value)
      text.value = ''
    }
  }
}

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('commentBody').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`comment${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
