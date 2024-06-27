<template>
  <article class="mb-4 card vacancy-article p-3">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <div class="card-text mb-2">
          <div class="mb-2">
            Работодатель:
            <RouterLink :to="{ name: 'profile', params: { username: vacancy.employer } }">{{
              vacancy.employer
            }}</RouterLink>
          </div>

          <div class="mb-2">{{ vacancy.description }}</div>
          <div class="mb-2">
            Требуемые навыки:
            <ul>
              <li class="skill-item" v-for="(skill, index) in skills" :key="index">
                {{ skill }}
              </li>
            </ul>
          </div>
          <div>
            Вакансия опубликована
            <time :datetime="vacancy.date">{{ datetime }}</time>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mt-4">
        <div>
          <template v-if="vacancy.employer == currentUser.username">
            <RouterLink
              class="btn btn-info btn-sm me-3"
              :to="{ name: 'vacancy', params: { id: vacancy.id } }"
            >
              Подробнее
            </RouterLink>
            <button class="btn btn-primary btn-sm me-3" @click="editVacancy">
              <FontAwesomeIcon class="me-2" :icon="faPenToSquare"></FontAwesomeIcon>Изменить
            </button>
            <button class="btn btn-danger btn-sm me-3" @click="deleteVacancy">
              <FontAwesomeIcon class="me-2" :icon="faTrash"></FontAwesomeIcon>Удалить
            </button>
          </template>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useVacancy } from '@/composable/useVacancy'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from '@/store/user'
import { useVacancyStore } from '@/store/vacancy'
import { useRouter } from 'vue-router'
const router = useRouter()

const { currentUser } = useUserStore()

const props = defineProps({
  vacancy: {
    required: true,
    type: Object
  }
})

const vacancy = ref(props.vacancy)

const emit = defineEmits(['deleteVacancy'])

const { fetchVacancy, errors } = useVacancy()
const { setEditVacancy } = useVacancyStore()

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    timeStyle: 'short',
    dateStyle: 'medium'
  }).format(new Date(vacancy.value.date))
)

const skills = computed(() => vacancy.value.skills.split(','))

const editVacancy = () => {
  setEditVacancy(vacancy.value)
  router.push({ name: 'editVacancy' })
}

const deleteVacancy = async () => {
  await fetchVacancy(vacancy.value.id, 'delete')
  if (errors.value.length === 0) emit('deleteVacancy', vacancy.value)
}
</script>

<style>
.vacancy-article {
  background-color: rgb(234, 248, 252);
  border-radius: 10px;
}

.vacancy-time {
  font-size: 0.8rem;
  color: gray;
  font-style: italic;
}

.skill-item {
  list-style-type: '- ';
}
</style>
