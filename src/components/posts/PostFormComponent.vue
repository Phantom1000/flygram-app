<template>
  <form
    class="text-center w-100 mb-5"
    @submit.prevent="addPost"
    novalidate
    enctype="multipart/form-data"
  >
    <div class="mb-2">
      <label for="postHashtags" class="form-label" v-show="false">Хэштеги</label>
      <input
        type="text"
        :class="[
          'form-control',
          {
            'is-invalid': errors.hashtags && errors.hashtags.length > 0
          }
        ]"
        id="postHashtags"
        v-model="hashtags"
        maxlength="100"
        placeholder="Хэштеги"
        aria-describedby="hashtagsHelp"
      />
      <div id="hashtagsHelp" class="form-text text-start mb-2">Введите хэштеги через запятую</div>
      <template v-if="errors.hashtags && errors.hashtags.length > 0">
        <div
          class="invalid-feedback text-start mb-2"
          v-for="(error, index) in errors.hashtags"
          :key="index"
        >
          {{ error }}
        </div>
      </template>
    </div>
    <div class="mb-2">
      <label for="postBody" class="form-label" v-show="false">Текст</label>
      <textarea
        :class="[
          'form-control',
          {
            'is-invalid': errors.text && errors.text.length > 0
          }
        ]"
        id="postBody"
        v-model="text"
        placeholder="Что у Вас нового?"
        maxlength="500"
        required
        rows="3"
      ></textarea>
      <template v-if="errors.text && errors.text.length > 0">
        <div
          class="invalid-feedback text-start mb-2"
          v-for="(error, index) in errors.text"
          :key="index"
        >
          {{ error }}
        </div>
      </template>
    </div>
    <div class="mb-2">
      <input
        type="file"
        :class="[
          'form-control',
          {
            'is-invalid': errors.image && errors.image.length > 0
          }
        ]"
        id="postImage"
        placeholder="Загрузите изображение"
        @change="onImageChanged"
        accept="image/*"
        aria-describedby="imageHelp"
      />
      <div id="imageHelp" class="form-text text-start mb-2">Загрузите изображение</div>
    </div>
    <button type="submit" class="w-100 btn btn-success">Опубликовать</button>
  </form>
</template>

<script setup>
import { toRefs } from 'vue'
import { usePostForm } from '@/composable/usePostForm.js'
import { watchEffect } from 'vue'

const props = defineProps({
  post: {
    required: true
  }
})

const { post } = toRefs(props)
const { hashtags, text, image, submitForm, errors } = usePostForm()

const emit = defineEmits(['updatePosts'])

watchEffect(() => {
  if (post.value) {
    hashtags.value = post.value.hashtags
    text.value = post.value.text
  }
})

const addPost = async () => {
  await submitForm(post.value)
  emit('updatePosts')
}

const onImageChanged = (event) => {
  const target = event.target
  if (target && target.files) {
    image.value = target.files[0]
  }
}
</script>
