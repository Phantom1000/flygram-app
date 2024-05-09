<template>
  <Transition name="toast">
    <div class="flytoast row justify-content-around align-content-center text-center" v-show="show">
      <div class="col-md-9">
        {{ message }}
      </div>
      <div class="offset-md-1 col-md-2">
        <button type="button" class="btn-close" @click="show = !show" aria-label="Close"></button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useFlashStore } from '@/store/flash'
import { storeToRefs } from 'pinia'

const { message, show } = storeToRefs(useFlashStore())
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

.flytoast {
  left: 40%;
  min-width: 20%;
  min-height: 50px;
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(0, 200, 0, 0.9);
  color: white;
  position: fixed;
  top: 5px;
  z-index: 10;
}
</style>
