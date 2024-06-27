<template>
  <form
    class="text-center w-100 mb-5"
    @submit.prevent="sendPost"
    novalidate
    enctype="multipart/form-data"
  >
    <div class="mb-2">
      <label for="postHashtags" class="form-label" v-show="false">Хэштеги</label>
      <input-component
        id="postHashtags"
        placeholder="Хэштеги"
        v-model="hashtags"
        autocomplete="username"
        :focus="true"
        :errors="errors.hashtags ?? []"
        described="Введите хэштеги через запятую"
      ></input-component>
    </div>
    <div class="mb-2">
      <label for="postText" class="form-label" v-show="false">Текст</label>
      <textarea-component
        id="postText"
        v-model="text"
        placeholder="Что у Вас нового?"
        :errors="errors.text ?? []"
      ></textarea-component>
    </div>
    <div class="mb-2">
      <file-component
        id="postImage"
        placeholder="Загрузите изображение"
        @file-change="onImageChanged"
        :errors="errors.image ?? []"
        label="Загрузите изображение"
        described="Загрузите изображение"
      ></file-component>
    </div>
    <div class="col-lg-12 d-flex mt-3">
      <button-component type="submit" class="w-100 btn-success" :is-loading="isLoading">
        {{ props.post === null ? 'Опубликовать' : 'Сохранить' }}
      </button-component>
      <button class="w-100 btn btn-danger ms-4" @click="emit('cancel')" v-if="props.post !== null">
        Отмена
      </button>
    </div>
  </form>
</template>

<script setup>
import { watch } from 'vue'
import { usePostForm } from '@/composable/usePostForm.js'
import { watchEffect } from 'vue'

const props = defineProps({
  post: {
    required: true
  },
  community: {
    required: false
  }
})

const { hashtags, text, image, submitForm, errors, isLoading } = usePostForm(props.post)

const emit = defineEmits(['addPost', 'updatePost', 'cancel'])

watchEffect(() => {
  if (props.post) {
    hashtags.value = props.post.hashtags
    text.value = props.post.text
  }
})

const sendPost = async () => {
  const newPost = await submitForm(props.post, props.community)
  if (newPost) {
    if (props.post !== null) {
      emit('updatePost', newPost)
    } else {
      emit('addPost', newPost)
    }
  }
}

const onImageChanged = (file) => (image.value = file)

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('postHashtags').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`post${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
