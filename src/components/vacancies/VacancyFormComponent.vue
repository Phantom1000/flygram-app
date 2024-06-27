<template>
  <div class="form-wrapper">
    <h1 class="text-center ms-3 my-3">
      {{ editVacancy === null ? 'Новая вакансия' : 'Редактирование' }}
    </h1>
    <div class="d-flex align-items-center w-100 m-auto form-register">
      <form class="text-center w-100 mb-5" @submit.prevent="submitForm(editVacancy)" novalidate>
        <div class="mb-2">
          <label for="vacancyDescription" class="form-label" v-show="false">Описание</label>
          <textarea-component
            id="vacancyDescription"
            v-model="description"
            placeholder="Описание"
            :errors="errors.description ?? []"
          ></textarea-component>
        </div>
        <div class="mb-2">
          <label for="vacancySkills" class="form-label" v-show="false">Навыки</label>
          <input-component
            id="vacancySkills"
            placeholder="Ключевые навыки"
            v-model="skills"
            autocomplete=""
            :focus="true"
            :errors="errors.skills ?? []"
            described="Введите необходимые навыки через запятую"
          ></input-component>
        </div>
        <div class="col-lg-12 d-flex mt-3">
          <button-component type="submit" class="w-100 btn-success" :is-loading="isLoading">
            {{ editVacancy === null ? 'Разместить' : 'Сохранить' }}
          </button-component>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useVacancyForm } from '@/composable/useVacancyForm.js'
import { useVacancyStore } from '@/store/vacancy'

const { description, skills, submitForm, errors, isLoading } = useVacancyForm()
const { editVacancy } = storeToRefs(useVacancyStore())

watchEffect(() => {
  if (editVacancy.value) {
    description.value = editVacancy.value.description
    skills.value = editVacancy.value.skills
  }
})

watch(errors, () => {
  if (errors.value.length > 0) {
    document.getElementById('vacancyDescription').focus()
  } else {
    Object.keys(errors.value).forEach((keyError) => {
      if (errors.value[keyError].length > 0) {
        document
          .getElementById(`vacancy${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`)
          .focus()
      }
    })
  }
})
</script>
