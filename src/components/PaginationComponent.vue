<template>
  <nav :aria-label="props.label" class="d-flex justify-content-center mt-3">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: route.query.page < 2 }" v-if="meta.totalPages > 1">
        <RouterLink
          class="page-link"
          :to="{
            name: route.name,
            query: { type: route.query.type, page: route.query.page - 1 }
          }"
          aria-label="Предыдущая"
        >
          <span aria-hidden="true">&laquo;</span>
        </RouterLink>
      </li>
      <li class="page-item" v-for="index in meta.totalPages" :key="index">
        <RouterLink
          :class="['page-link', { active: index == route.query.page }]"
          :to="{ name: route.name, query: { type: route.query.type, page: index } }"
          >{{ index }}</RouterLink
        >
      </li>
      <li
        class="page-item"
        :class="{ disabled: route.query.page >= meta.totalPages }"
        v-if="meta.totalPages > 1"
      >
        <RouterLink
          class="page-link"
          :to="{
            name: route.name,
            query: { type: route.query.type, page: parseInt(route.query.page) + 1 }
          }"
          aria-label="Следующая"
        >
          <span aria-hidden="true">&raquo;</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { toRefs } from 'vue'

const route = useRoute()
const props = defineProps({
  meta: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const { meta } = toRefs(props)
</script>
