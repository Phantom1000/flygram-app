import MainPageComponent from '@/components/MainPageComponent.vue'
import LoginFormComponent from '@/components/LoginFormComponent.vue'
import RegisterFormComponent from '@/components/RegisterFormComponent.vue'
import ProfileComponent from '@/components/users/ProfileComponent.vue'
import PostListComponent from '@/components/posts/PostListComponent.vue'
import PostInfoComponent from '@/components/posts/PostInfoComponent.vue'
import UserListComponent from '@/components/users/UserListComponent.vue'
import EditProfileComponent from '@/components/users/EditProfileComponent.vue'
import ChangePasswordForm from '@/components/users/ChangePasswordForm.vue'
import { useFlashStore } from '@/store/flash'
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { createWebHistory, createRouter } from 'vue-router'
import config from '@/config'
import { useFetch } from '@/composable/useFetch'

const routes = [
  {
    path: '/posts',
    component: PostListComponent,
    alias: ['/'],
    name: 'posts',
    meta: { title: 'Новости', requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginFormComponent,
    name: 'login',
    meta: { title: 'Вход' }
  },
  {
    path: '/register',
    component: RegisterFormComponent,
    name: 'register',
    meta: { title: 'Регистрация' }
  },
  {
    path: '/profile/:username',
    component: ProfileComponent,
    name: 'profile',
    meta: { title: 'Профиль', requiresAuth: true }
  },
  {
    path: '/profile/:username/edit',
    component: EditProfileComponent,
    name: 'edit-profile',
    meta: { title: 'Редактирование профиля', requiresAuth: true }
  },
  {
    path: '/profile/:username/password',
    component: ChangePasswordForm,
    name: 'change-password',
    meta: { title: 'Изменение пароля', requiresAuth: true }
  },
  {
    path: '/users',
    component: UserListComponent,
    name: 'users',
    meta: { title: 'Все пользователи', requiresAuth: true }
  },
  {
    path: '/friends/:username',
    component: UserListComponent,
    name: 'friends',
    meta: { title: 'Друзья', requiresAuth: true }
  },
  {
    path: '/post/:id(\\d+)',
    component: PostInfoComponent,
    name: 'post',
    meta: { title: 'Новость', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.addRoute({
  path: '/logout',
  name: 'logout',
  beforeEnter() {
    const { setCurrentUser } = useUserStore()
    const { setToken } = useTokenStore()
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    // router.replace("/login")
    router.replace({ name: 'login' })
  }
})

router.addRoute({
  path: '/profile/:username/delete',
  name: 'delete-profile',
  beforeEnter(to) {
    const { token, setToken } = useTokenStore()
    useFetch(
      'delete',
      `user/${to.params.username}`,
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
    const { setCurrentUser } = useUserStore()
    setCurrentUser(null)
    setToken(null)
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    router.replace({ name: 'login' })
  }
})

router.beforeEach((to) => {
  const { show, setMessage, setShow } = useFlashStore()
  const { token } = useTokenStore()

  if (show) {
    setShow(show - 1)
  } else {
    setMessage('')
  }
  document.title = `${config.appName} - ${to.meta.title}`

  if (to.meta.requiresAuth && !token) {
    return {
      path: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  if ((to.name === 'login' || to.name === 'register') && token) {
    return {
      path: 'index'
    }
  }
})

export default router
