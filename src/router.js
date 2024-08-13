import LoginFormComponent from '@/components/LoginFormComponent.vue'
import RegisterFormComponent from '@/components/RegisterFormComponent.vue'
import ProfileComponent from '@/components/users/ProfileComponent.vue'
import PostListComponent from '@/components/posts/PostListComponent.vue'
import PostInfoComponent from '@/components/posts/PostInfoComponent.vue'
import UserListComponent from '@/components/users/UserListComponent.vue'
import CommunityListComponent from '@/components/communities/CommunityListComponent.vue'
import CommunityFormComponent from '@/components/communities/CommunityFormComponent.vue'
import VacancyFormComponent from '@/components/vacancies/VacancyFormComponent.vue'
import EditProfileComponent from '@/components/users/EditProfileComponent.vue'
import ChangePasswordForm from '@/components/users/ChangePasswordForm.vue'
import SecurityComponent from '@/components/users/SecurityComponent.vue'
import CommunityPageComponent from '@/components/communities/CommunityPageComponent.vue'
import ChatComponent from '@/components/messages/ChatComponent.vue'
import VacancyListComponent from '@/components/vacancies/VacancyListComponent.vue'
import VacancyPageComponent from '@/components/vacancies/VacancyPageComponent.vue'
import { useFlashStore } from '@/store/flash'
import { useToken } from '@/composable/useToken'
import { useUserStore } from '@/store/user'
import { createWebHistory, createRouter } from 'vue-router'
import config from '@/config'
import { useFetch } from '@/composable/useFetch'
import PasswordResetEmailForm from './components/users/PasswordResetEmailForm.vue'
import PasswordResetForm from './components/users/PasswordResetForm.vue'
import TwoFactorForm from './components/users/TwoFactorForm.vue'

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
    path: '/members/:id(\\d+)',
    component: UserListComponent,
    name: 'members',
    meta: { title: 'Участники', requiresAuth: true }
  },
  {
    path: '/post/:id(\\d+)',
    component: PostInfoComponent,
    name: 'post',
    meta: { title: 'Новость', requiresAuth: true }
  },
  {
    path: '/communities',
    component: CommunityListComponent,
    name: 'communities',
    meta: { title: 'Сообщества', requiresAuth: true }
  },
  {
    path: '/coummunity/:id(\\d+)',
    component: CommunityPageComponent,
    name: 'community',
    meta: { title: 'Сообщество', requiresAuth: true }
  },
  {
    path: '/coummunities/edit',
    component: CommunityFormComponent,
    name: 'editCommunity',
    meta: { title: 'Новое сообщество', requiresAuth: true }
  },
  {
    path: '/messages/:username',
    component: ChatComponent,
    name: 'messages',
    meta: { title: 'Сообщения', requiresAuth: true }
  },
  {
    path: '/vacancies/edit',
    component: VacancyFormComponent,
    name: 'editVacancy',
    meta: { title: 'Новая вакансия', requiresAuth: true }
  },
  {
    path: '/vacancies',
    component: VacancyListComponent,
    name: 'vacancies',
    meta: { title: 'Вакансии', requiresAuth: true }
  },
  {
    path: '/vacancy/:id(\\d+)',
    component: VacancyPageComponent,
    name: 'vacancy',
    meta: { title: 'Вакансия', requiresAuth: true }
  },
  {
    path: '/reset-password',
    component: PasswordResetEmailForm,
    name: 'resetPassword',
    meta: { title: 'Сброс пароля' }
  },
  {
    path: '/set-new-password',
    component: PasswordResetForm,
    name: 'setNewPassword',
    meta: { title: 'Сброс пароля' }
  },
  {
    path: '/security',
    component: SecurityComponent,
    name: 'security',
    meta: { title: 'Безопасность', requiresAuth: true }
  },
  {
    path: '/two-factor',
    component: TwoFactorForm,
    name: 'two-factor',
    meta: { title: 'Вход' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.addRoute({
  path: '/logout',
  name: 'logout',
  beforeEnter: async () => {
    const { setCurrentUser } = useUserStore()
    const { setToken, removeToken } = useToken()
    await useFetch('delete', 'token')
    setCurrentUser(null)
    await setToken(null)
    await removeToken(null)
    router.replace({ name: 'login' })
  }
})

router.addRoute({
  path: '/profile/:username/delete',
  name: 'delete-profile',
  beforeEnter: async (to) => {
    const { getToken, setToken, removeToken } = useToken()
    const token = await getToken()
    await useFetch(
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
    await setToken(null)
    await removeToken(null)
    router.replace({ name: 'login' })
  }
})

router.addRoute({
  path: '/verify-email',
  name: 'verify-email',
  beforeEnter: async () => {
    const { getToken } = useToken()
    const token = await getToken()
    await useFetch(
      'post',
      'email',
      {},
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    )
  }
})

router.beforeEach(async (to) => {
  const { show, setMessage, setShow } = useFlashStore()
  //const { token } = useTokenStore()
  const { getToken } = useToken()
  const token = await getToken()

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
