<template>
  <div class="mb-3 card">
    <div class="card-body justify-content-between d-flex align-items-center">
      <div class="col-md-8 card-text">
        <div class="row">
          <div class="col-md-4">
            <div class="medium-avatar">
              <img
                :src="API_URL + user.links.avatar"
                width="100"
                height="100"
                v-if="user.links.avatar"
              />
            </div>
          </div>
          <div class="col-md-8 d-flex align-items-center">
            <div>
              <div>
                <h2>
                  <RouterLink
                    :to="{ name: 'profile', params: { username: user.username } }"
                    class="ms-2"
                    >{{ user.firstname }} {{ user.lastname }}</RouterLink
                  >
                </h2>
              </div>

              <div>{{ user.city ?? '' }} {{ user.career ?? '' }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <button @click="removeFriend" v-if="user.isFriend" class="btn btn-danger fly-btn">
          Удалить из друзей
        </button>
        <button @click="removeFriend" v-else-if="user.isFollower" class="btn btn-danger fly-btn">
          Отменить заявку
        </button>
        <button @click="acceptFriend" v-else-if="user.isFollowing" class="btn btn-success fly-btn">
          Принять заявку
        </button>
        <button @click="addFriend" v-else class="btn btn-primary fly-btn">Добавить в друзья</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import config from '@/config'
import { useUserActions } from '@/composable/useUserActions.js'
import { ref } from 'vue'
const API_URL = config.apiUrl

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const user = ref(props.user)
const { addFriend, removeFriend, acceptFriend } = useUserActions(user)
</script>

<style scoped>
.medium-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: gray;
}

.medium-avatar img {
  border-radius: 50px;
  object-fit: cover;
}

.fly-btn {
  width: 90%;
}
</style>
