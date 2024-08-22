<template>
  <input
    :type="props.type"
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
  />
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
  name: 'input-component'
}
</script>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'input'
  },
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
  }
})

const value = defineModel()
</script>
