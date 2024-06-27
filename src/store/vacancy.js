import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVacancyStore = defineStore('vacancy', () => {
  const editVacancy = ref(null)

  function setEditVacancy(vacancy) {
    editVacancy.value = vacancy
  }

  return { editVacancy, setEditVacancy }
})
