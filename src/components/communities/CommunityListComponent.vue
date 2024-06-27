<template>
  <section class="container-fluid">
    <SpinnerComponent v-if="isLoading" />

    <div class="row justify-content-center d-flex align-items-start" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : route.meta.title }}
      </h1>
      <div class="alert alert-danger text-start" v-if="errors.length > 0">
        {{ errors[0] }}
      </div>
      <template v-else-if="currentUser">
        <div class="col-md-12 col-lg-9">
          <ul class="nav d-flex justify-content-center">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'communities', query: { username: currentUser.username } }"
                >Мои сообщества</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{
                  name: 'communities',
                  query: { username: currentUser.username, type: 'admin' }
                }"
                >Управление</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                exact-active-class="active"
                :to="{ name: 'communities', query: { type: 'recommended' } }"
                >Рекомендации</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" exact-active-class="active" :to="{ name: 'communities' }"
                >Все сообщества</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="btn btn-success" :to="{ name: 'editCommunity' }"
                >Создать сообщество</RouterLink
              >
            </li>
          </ul>
          <div class="row mt-3 justify-content-center">
            <div class="col-md-2 col-lg-3 card fly-filter">
              <h2 class="text-center mt-3">Фильтры</h2>
              <form class="card-body" role="search">
                <input
                  v-model.lazy="name"
                  class="form-control mt-3"
                  type="search"
                  placeholder="Название"
                  aria-label="Название"
                />
              </form>
            </div>
            <div class="col-md-9 community-list">
              <CommunityComponent
                v-for="community in communities"
                :key="community.id"
                :community="community"
                @delete-community="deleteCommunity"
              ></CommunityComponent>
            </div>
          </div>

          <PaginationComponent label="Страницы сообщества" :meta="meta"></PaginationComponent>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { useCommunities } from '@/composable/useCommunities'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import CommunityComponent from '@/components/communities/CommunityComponent.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import PaginationComponent from '@/components/PaginationComponent.vue'

const { currentUser } = storeToRefs(useUserStore())

const { communities, meta, getCommunities, isLoading, errors } = useCommunities()
const name = ref('')
const route = useRoute()

// getUsers()
watchEffect(() => {
  getCommunities(route.query.username, route.query.type, route.query.page, name.value)
})

const deleteCommunity = (community) => {
  communities.value = communities.value.filter((el) => el.id !== community.id)
}
</script>

<style>
.community-list {
  min-height: 500px;
}
</style>
