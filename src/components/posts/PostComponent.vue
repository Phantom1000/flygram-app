<template>
  <article class="mb-4 card post-article p-3">
    <PostFormComponent
      :post="props.post"
      @update-post="updatePost"
      @cancel="isEdited = false"
      v-if="isEdited"
    ></PostFormComponent>
    <template v-else>
      <img
        :src="API_URL + props.post.links.image"
        class="card-img-top"
        v-if="props.post.links.image"
      />
      <div class="card-body">
        <div class="card-title d-flex justify-content-between">
          <div>
            <RouterLink
              v-for="hashtag in hashtags"
              :key="hashtag"
              :to="{ name: 'posts', query: { hashtag: hashtag } }"
              class="ms-2"
              >#{{ hashtag }}</RouterLink
            >
          </div>

          <time class="post-time" :datetime="props.post.publicationDate">{{ datetime }}</time>
        </div>

        <p class="card-text mb-2">
          <RouterLink :to="{ name: 'profile', params: { username: props.post.author } }">{{
            props.post.author
          }}</RouterLink
          >: {{ props.post.text }}
        </p>
        <div class="d-flex justify-content-between mt-4">
          <div>
            <FontAwesomeIcon
              @click="likePost"
              class="like-icon like mx-2"
              :class="{ liked, 'like-animation': animate }"
              :icon="faHeart"
              ref="likeIcon"
            ></FontAwesomeIcon>
            {{ likesCount }}
          </div>
          <div>
            <template v-if="route.name == 'profile' && props.post.author == currentUser.username">
              <button class="btn btn-primary btn-sm me-3" @click="editPost">
                <FontAwesomeIcon class="me-2" :icon="faPenToSquare"></FontAwesomeIcon>Изменить
              </button>
              <button class="btn btn-danger btn-sm me-3" @click="deletePost">
                <FontAwesomeIcon class="me-2" :icon="faTrash"></FontAwesomeIcon>Удалить
              </button>
            </template>
            <RouterLink :to="{ name: 'post', params: { id: props.post.id } }">Подробнее</RouterLink>
          </div>
        </div>
      </div>
    </template>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { useLike } from '@/composable/useLike'
import { usePost } from '@/composable/usePost'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRoute } from 'vue-router'
import config from '@/config'
import { useUserStore } from '@/store/user'
import PostFormComponent from '@/components/posts/PostFormComponent.vue'

const { currentUser } = useUserStore()
const API_URL = config.apiUrl

const props = defineProps({
  post: {
    required: true,
    type: Object
  }
})

const emit = defineEmits(['updatePost', 'deletePost'])

const isEdited = ref(false)

const { like, unlike } = useLike()
const route = useRoute()

const { fetchPost, errors } = usePost()

const hashtags = computed(() => props.post.hashtags.split(','))

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    timeStyle: 'short',
    dateStyle: 'medium'
  }).format(new Date(props.post.publicationDate))
)

const liked = ref(props.post.isLiked)
const likesCount = ref(props.post.likesCount)
const animate = ref(false)

const likePost = () => {
  if (liked.value) {
    unlike(props.post)
    likesCount.value--
  } else {
    like(props.post)
    likesCount.value++
    animate.value = true
  }
  liked.value = !liked.value
}

const editPost = () => {
  isEdited.value = true
}

const updatePost = (post) => {
  isEdited.value = false
  emit('updatePost', post)
}

const deletePost = async () => {
  await fetchPost(props.post.id, 'delete')
  if (errors.value.length === 0) emit('deletePost', props.post)
}
</script>

<style>
.post-article {
  background-color: rgb(234, 248, 252);
  border-radius: 10px;
}

.post-time {
  font-size: 0.8rem;
  color: gray;
  font-style: italic;
}

.like-icon {
  cursor: pointer;
  color: gray;
  transform: scale(2);
}

.liked {
  color: red;
}

@keyframes like-frames {
  from {
    transform: scale(2);
  }
  50% {
    transform: scale(3);
  }
  to {
    transform: scale(2);
  }
}

.like-animation {
  animation: ease like-frames 0.7s;
}

.fly-img {
  width: 200px;
}
</style>
