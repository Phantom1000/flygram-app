<template>
  <button class="btn" :disabled="props.isLoading">
    <div class="spinner-border text-light" role="status" v-show="props.isLoading">
      <span class="visually-hidden">Загрузка...</span>
    </div>
    <span v-show="!props.isLoading"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'button-component'
}
</script>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})
</script>
