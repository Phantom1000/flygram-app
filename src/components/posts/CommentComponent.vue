<template>
  <article class="mb-4 card comment-article p-3">
    <div class="card-body">
      <slot @cancel="isEdited = false" v-if="isEdited"></slot>
      <CommentFormComponent
        :comment="props.comment"
        @update-comment="(comment) => updateComment(comment)"
        @cancel="isEdited = false"
        v-if="isEdited"
      ></CommentFormComponent>
      <template v-else>
        <div class="d-flex justify-content-between">
          <p class="card-text mb-2">
            <RouterLink :to="{ name: 'profile', params: { username: props.comment.author } }">{{
              props.comment.author
            }}</RouterLink
            >: {{ props.comment.text }}
          </p>
          <time class="comment-time" :datetime="props.comment.date">{{ datetime }}</time>
        </div>
        <div class="d-flex justify-content-end mt-4">
          <div>
            <template v-if="props.comment.author == currentUser.username">
              <button class="btn btn-primary btn-sm me-3" @click="editComment">
                <FontAwesomeIcon class="me-2" :icon="faPenToSquare"></FontAwesomeIcon>Изменить
              </button>
              <button class="btn btn-danger btn-sm me-3" @click="deleteComment">
                <FontAwesomeIcon class="me-2" :icon="faTrash"></FontAwesomeIcon>Удалить
              </button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useComment } from '@/composable/useComment'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from '@/store/user'
import CommentFormComponent from '@/components/posts/CommentFormComponent.vue'

const { currentUser } = useUserStore()

const props = defineProps({
  comment: {
    required: true,
    type: Object
  }
})

const emit = defineEmits(['updateComment', 'deleteComment'])

const { fetchComment, errors } = useComment()

const isEdited = ref(false)

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    timeStyle: 'short',
    dateStyle: 'medium'
  }).format(new Date(props.comment.date))
)

const editComment = () => {
  isEdited.value = true
}

const updateComment = (comment) => {
  isEdited.value = false
  emit('updateComment', comment)
}

const deleteComment = async () => {
  await fetchComment(props.comment.id, 'delete')
  if (errors.value.length === 0) emit('deleteComment', props.comment)
}
</script>

<style>
.comment-article {
  background-color: rgb(234, 248, 252);
  border-radius: 10px;
}

.comment-time {
  font-size: 0.8rem;
  color: gray;
  font-style: italic;
}
</style>
