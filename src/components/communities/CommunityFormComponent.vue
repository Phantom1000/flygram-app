<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">
      {{ editCommunity === null ? 'Новое сообщество' : 'Редактирование' }}
    </h1>
    <div class="d-flex align-items-center w-100 m-auto form-register">
      <form
        class="text-center w-100 mb-5"
        @submit.prevent="submitForm(editCommunity)"
        novalidate
        enctype="multipart/form-data"
      >
        <div class="mb-2">
          <label for="communityName" class="form-label" v-show="false">Название</label>
          <input-component
            id="communityName"
            placeholder="Название"
            v-model="name"
            autocomplete=""
            :focus="true"
            :errors="errors.name ?? []"
            described="Введите название сообщества"
          ></input-component>
        </div>
        <div class="mb-2">
          <label for="communityDescription" class="form-label" v-show="false">Описание</label>
          <textarea-component
            id="communityDescription"
            v-model="description"
            placeholder="Описание"
            :errors="errors.description ?? []"
          ></textarea-component>
        </div>
        <div class="mb-2">
          <file-component
            id="communityImage"
            placeholder="Загрузите изображение"
            @file-change="onImageChanged"
            :errors="errors.image ?? []"
            label="Загрузите изображение"
            described="Загрузите изображение"
          ></file-component>
        </div>
        <div class="col-lg-12 d-flex mt-3">
          <button-component type="submit" class="w-100 btn-success" :is-loading="isLoading">
            {{ editCommunity === null ? 'Создать' : 'Сохранить' }}
          </button-component>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useCommunityForm } from '@/composable/useCommunityForm.js'
import { useCommunityStore } from '@/store/community'

const { name, description, image, submitForm, errors, isLoading } = useCommunityForm()
const { editCommunity } = storeToRefs(useCommunityStore())

const onImageChanged = (file) => (image.value = file)

watchEffect(() => {
  if (editCommunity.value) {
    name.value = editCommunity.value.name
    description.value = editCommunity.value.description
  }
})

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('communityName').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`community${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
