<template>
  <div class="mb-3 card">
    <div class="card-body justify-content-between d-flex align-items-center">
      <div class="col-md-8 card-text">
        <div class="row">
          <div class="col-md-4">
            <div class="medium-avatar">
              <img
                :src="API_URL + community.links.image"
                width="100"
                height="100"
                v-if="community.links.image"
              />
            </div>
          </div>
          <div class="col-md-8 d-flex align-items-center">
            <div>
              <div>
                <h2>
                  <RouterLink
                    :to="{ name: 'community', params: { id: community.id } }"
                    class="ms-2"
                    >{{ community.name }}</RouterLink
                  >
                </h2>
              </div>

              <div>{{ community.membersCount }} участников</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <template v-if="route.query.type === 'admin' && community.owner === currentUser.username">
          <button @click="editCommunity" class="btn btn-primary mt-2 fly-btn">Редактировать</button>
          <button @click="deleteCommunity" class="btn btn-danger mt-2 fly-btn">Удалить</button>
        </template>
        <template v-else>
          <button
            @click="leaveCommunity"
            v-if="community.isMember && community.owner !== currentUser.username"
            class="btn btn-danger fly-btn"
          >
            Покинуть
          </button>
          <button
            @click="joinCommunity"
            v-else-if="!community.isMember && community.owner !== currentUser.username"
            class="btn btn-primary mt-2 fly-btn"
          >
            Вступить
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import config from '@/config'
import { useCommunityActions } from '@/composable/useCommunityActions.js'
import { useCommunity } from '@/composable/useCommunity'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useCommunityStore } from '@/store/community'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const API_URL = config.apiUrl

const props = defineProps({
  community: {
    required: true,
    type: Object
  }
})
const router = useRouter()
const community = ref(props.community)
const { setEditCommunity } = useCommunityStore()
const { fetchCommunity, errors } = useCommunity()
const { joinCommunity, leaveCommunity } = useCommunityActions(community)

const emit = defineEmits(['deleteCommunity'])
const route = useRoute()

const { currentUser } = useUserStore()

const editCommunity = () => {
  setEditCommunity(community.value)
  router.push({ name: 'editCommunity' })
}

const deleteCommunity = async () => {
  await fetchCommunity(community.value.id, 'delete')
  if (errors.value.length === 0) emit('deleteCommunity', community.value)
}
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
