<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingVacancies" />
    <div class="row justify-content-center d-flex align-items-center" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : route.meta.title }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors && errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <template v-else-if="currentUser">
        <div class="col-md-12 col-lg-9">
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'vacancies', query: { employer: currentUser.username } }"
                >Мои вакансии</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{
                  name: 'vacancies',
                  query: { type: 'recommended' }
                }"
                >Рекомендации</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" exact-active-class="active" :to="{ name: 'vacancies' }"
                >Все вакансии</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="btn btn-success" :to="{ name: 'editVacancy' }"
                >Разместить</RouterLink
              >
            </li>
          </ul>
          <div class="row mt-3 justify-content-center">
            <div class="col-md-2 col-lg-3 card post-filter">
              <h2 class="text-center mt-3">Поиск</h2>
              <form class="card-body" role="search">
                <input
                  v-model.lazy="description"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Описание"
                  aria-label="Описание"
                />
              </form>
            </div>
            <div class="col-md-9">
              <VacancyComponent
                v-for="vacancy in vacancies"
                @delete-vacancy="deleteVacancy"
                :key="vacancy.id"
                :vacancy="vacancy"
              ></VacancyComponent>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import { useVacancies } from '@/composable/useVacancies'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useRoute } from 'vue-router'
import VacancyComponent from '@/components/vacancies/VacancyComponent.vue'
import { useLoading } from '@/composable/useLoading'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const { currentUser } = storeToRefs(useUserStore())

const { vacancies, meta, getVacancies, isLoadingVacancies, errors } = useVacancies()
const route = useRoute()
const currentPage = ref(1)
const description = ref('')

watchEffect(() => {
  currentPage.value = 1
  vacancies.value = []
  getVacancies(1, route.query.employer, route.query.type, description, true)
})

const deleteVacancy = (vacancy) => {
  vacancies.value = vacancies.value.filter((el) => el !== vacancy)
}

useLoading(
  currentPage,
  getVacancies,
  isLoadingVacancies,
  meta,
  route.query.employer,
  route.query.type,
  description
)
</script>

<style>
.vacancy-filter {
  min-height: 150px;
  max-height: 150px;
}

.vacancy-list {
  min-height: 500px;
}
</style>
