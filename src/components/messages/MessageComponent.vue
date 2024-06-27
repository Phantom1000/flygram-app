<template>
  <article
    class="mb-4 message-article p-3"
    :class="props.message.sender === currentUser.username ? 'align-self-start' : 'align-self-end'"
  >
    <div>
      <p class="mb-2">
        <RouterLink :to="{ name: 'profile', params: { username: props.message.sender } }">{{
          props.message.sender
        }}</RouterLink
        ><time class="ms-2 message-time" :datetime="props.message.date">{{ datetime }}</time>
      </p>
      <div>{{ props.message.body }}</div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
const { currentUser } = storeToRefs(useUserStore())

const props = defineProps({
  message: {
    required: true,
    type: Object
  }
})

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    timeStyle: 'short'
  }).format(new Date(props.message.date))
)
</script>

<style>
.message-article {
  background-color: rgb(198, 199, 202);
  border-radius: 50px;
  width: 50%;
  align-self: flex-end;
}

.message-time {
  font-size: 0.8rem;
  color: gray;
  font-style: italic;
}
</style>
