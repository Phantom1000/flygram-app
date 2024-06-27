<template>
  <input
    type="file"
    :class="[
      'form-control mb-2',
      {
        'is-invalid': errors && errors.length > 0
      }
    ]"
    :id="props.id"
    :placeholder="props.placeholder"
    @change="onFileChanged"
    :required="props.required"
    accept="image/*"
    :aria-describedby="props.id + 'Help'"
  />
  <template v-if="errors && errors.length > 0">
    <div class="invalid-feedback text-start mb-2" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </div>
  </template>
  <div v-else :id="props.id + 'Help'" class="form-text text-start mb-2">
    {{ described }}
  </div>
</template>

<script>
export default {
  name: 'file-component'
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
    default: false
  },
  errors: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  described: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['file-change'])

const onFileChanged = (event) => {
  const target = event.target
  if (target && target.files) {
    emit('file-change', target.files[0])
  }
}
</script>
