import MainPageComponent from "@/components/MainPageComponent.vue";
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import { useStore } from "@/store";
import { createWebHistory, createRouter } from "vue-router";
import config from "@/config";

const routes = [
  {
    path: "/",
    component: MainPageComponent,
    alias: [
      "/index"
    ],
    meta: { title: "Главная" },
  },
  {
    path: "/login",
    component: LoginFormComponent,
    name: "login",
    meta: { title: "Вход" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const { store, setFlashMessage, setFlashShow } = useStore();

  if (store.flashShow) {
    setFlashShow(store.flashShow - 1);
  } else {
    setFlashMessage('');
  }
  document.title = `${config.appName} - ${to.meta.title}`;
});

export default router;
