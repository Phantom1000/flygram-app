<template>
  <textarea
    :class="[
      'form-control mb-2',
      {
        'is-invalid': errors && errors.length > 0
      }
    ]"
    :id="props.id"
    :placeholder="props.placeholder"
    v-model.trim="value"
    :autocomplete="props.autocomplete"
    :required="props.required"
    :autofocus="props.focus"
    :aria-describedby="props.id + 'Help'"
    :style="`height: ${height}px`"
    :rows="rows"
  ></textarea>
  <label v-if="label" :for="id">{{ label }}</label>
  <template v-if="errors && errors.length > 0">
    <div class="invalid-feedback text-start mb-2" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </div>
  </template>
  <div v-else-if="described" :id="props.id + 'Help'" class="form-text text-start mb-2">
    {{ described }}
  </div>
</template>

<script>
export default {
  name: 'textarea-component'
}
</script>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: true
  },
  autocomplete: {
    type: String,
    default: ''
  },
  focus: {
    type: Boolean,
    default: false
  },
  errors: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  described: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  },
  height: {
    type: Number,
    default: 150
  }
})

const value = defineModel()
</script>
