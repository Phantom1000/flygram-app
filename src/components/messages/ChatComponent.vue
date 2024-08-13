<template>
  <section class="container">
    <SpinnerComponent v-if="isLoadingMessages" />
    <div class="row justify-content-center d-flex align-items-center" v-else>
      <h1 class="text-center ms-3 my-3">
        {{ errors && errors.length > 0 ? errors[0] : `Сообщения ${route.params.username}` }}
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
          <div class="row mt-3 align-items-center message-container">
            <div class="col-md-9">
              <div class="d-flex flex-column">
                <MessageComponent
                  v-for="message in reversedMessages"
                  :key="message.id"
                  :message="message"
                ></MessageComponent>
              </div>
              <MessageFormComponent id="messageForm" :socket="socket"></MessageFormComponent>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { watchEffect, ref, computed, onMounted, onUnmounted } from 'vue'
import { useLoading } from '@/composable/useLoading'
import { useMessages } from '@/composable/useMessages'
import SpinnerComponent from '@/components/SpinnerComponent.vue'
import { useRoute } from 'vue-router'
import MessageComponent from '@/components/messages/MessageComponent.vue'
import MessageFormComponent from '@/components/messages/MessageFormComponent.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { io } from 'socket.io-client'
import config from '@/config'
import utils from '@/utils.js'

const { currentUser } = storeToRefs(useUserStore())

const { messages, meta, getMessages, isLoadingMessages, errors } = useMessages()
const route = useRoute()
const currentPage = ref(1)
const reversedMessages = computed(() => messages.value.toReversed())
const socket = io(config.apiUrl + '/chat')
socket.off()

watchEffect(() => {
  currentPage.value = 1
  messages.value = []
  getMessages(1, route.params.username, true)
})

onMounted(() => {
  socket.connect()
  socket.on('connect', () => {
    socket.emit('joined', { sender: currentUser.value.username, recipient: route.params.username })
  })
  socket.on('message', (response) => {
    messages.value.unshift(utils.toCamel(response.data_message))
  })
})

onUnmounted(() => {
  socket.emit(
    'left',
    { sender: currentUser.value.username, recipient: route.params.username },
    () => {
      socket.disconnect()
    }
  )
})

useLoading(currentPage, getMessages, isLoadingMessages, meta, route.params.username)
</script>

<style>
.message-container {
  min-height: 70vh;
  display: flex;
  flex-direction: column-reverse;
}

.observer {
  height: 30px;
  background: green;
}
</style>
