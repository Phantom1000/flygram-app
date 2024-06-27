<template>
  <div
    class="modal fade"
    id="userInfo"
    tabindex="-1"
    aria-labelledby="userInfoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="userInfoLabel">Подробная информация о пользователе</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column p-3">
            <div class="row mb-3" v-if="props.user.username">
              <p>Имя пользователя: {{ props.user.username ?? '' }}</p>
            </div>

            <div class="row mb-3" v-if="props.user.dateBirth">
              <p>
                Дата рождения:
                <time :datetime="props.user.dateBirth">{{ datetime }}</time>
              </p>
            </div>
            <div class="row mb-3" v-if="props.user.city">
              <p>Город: {{ props.user.city ?? '' }}</p>
            </div>
            <div class="row" v-if="props.user.address">
              <address>Адрес: {{ props.user.address ?? '' }}</address>
            </div>
            <div class="row" v-if="props.user.email">
              <address>
                Email:
                <a :href="`mailto:${props.user.email}`"> {{ props.user.email ?? '' }}</a>
              </address>
            </div>
            <div class="row" v-if="props.user.phoneNumber">
              <address>
                Телефон:
                <a :href="`tel:${props.user.phoneNumber}`"> {{ props.user.phoneNumber ?? '' }}</a>
              </address>
            </div>
            <div class="row mb-3" v-if="props.user.education">
              <p>Образование: {{ props.user.education ?? '' }}</p>
            </div>
            <div class="row mb-3" v-if="props.user.skills">
              <p>Навыки: {{ props.user.skills ?? '' }}</p>
            </div>
            <div class="row mb-3" v-if="props.user.hobbies">
              <p>Увлечения: {{ props.user.hobbies ?? '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    required: true,
    type: Object
  }
})

const datetime = computed(() =>
  new Intl.DateTimeFormat('ru', {
    dateStyle: 'medium'
  }).format(new Date(props.user.dateBirth))
)
</script>
