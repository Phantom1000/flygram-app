<template>
  <header class="header">
    <nav class="py-2 border-bottom">
      <div class="container d-flex flex-wrap align-items-center">
        <img src="@/assets/images/logo.png" class="logo" alt="Черные крылья">
        <ul class="nav me-auto">
          <li class="nav-item">
            <RouterLink
              to="/"
              class="nav-link px-2 text-white flylink"
              :class="$route.fullPath == '/' ? 'active' : ''"
              aria-current="page"
              >Главная</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link px-2 text-white flylink"
            :class="$route.fullPath == '/login' ? 'active' : ''"
              >Войти</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>