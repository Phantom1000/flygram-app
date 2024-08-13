<template>
  <tr>
    <td class="col-md-2">{{ props.session.ip }}</td>
    <td class="col-md-5">{{ props.session.platform }}</td>
    <td class="col-md-3">
      <time :datetime="props.session.createdAt">{{ datetime }}</time>
    </td>
    <td class="col-md-2">
      <button @click="deleteSession" class="btn btn-danger fly-btn">Завершить</button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from 'vue'
import { useSession } from '@/composable/useSession'

const props = defineProps({
  session: {
    required: true,
    type: Object
  }
})

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    timeStyle: 'short',
    dateStyle: 'medium'
  }).format(new Date(props.session.createdAt))
)

const { fetchSession, errors } = useSession()

const emit = defineEmits(['deleteSession'])

const deleteSession = async () => {
  await fetchSession(props.session.id, 'delete')
  if (errors.value.length === 0) emit('deleteSession', props.session)
}
</script>
