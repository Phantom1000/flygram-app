import { ref } from "vue";
import { useRouter } from 'vue-router'
import axios from "axios";
import { useStore } from "@/store";
import config from "@/config";


export const useLoginForm = () => {
  const router = useRouter()
  const errors = ref([]);
  const username = ref("");
  const password = ref("");
  const rememberMe = ref(false);

  const validateForm = () => {
    errors.value = {
      username: [],
      password: [],
    };
    if (username.value === "") {
      errors.value.username.push("Введите имя");
    } else if (username.value.length < 3) {
      errors.value.username.push("Слишком короткое имя пользователя");
    } else if (username.value.length > 32) {
      errors.value.username.push("Слишком длинное имя пользователя");
    }
    if (password.value === "") {
      errors.value.username.push("Введите пароль");
    } else if (username.value.length < 3) {
      errors.value.username.push("Слишком короткий пароль");
    } else if (password.value.length > 32) {
      errors.value.password.push("Слишком длинный пароль");
    }
    return errors.value.username.length == 0 && errors.value.password.length == 0;
  };

  const sendForm = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${config.apiUrl}/login`,
        data: {
          username: username.value,
          password: password.value,
          rememberMe: rememberMe.value,
        },
        headers: { "Content-Type": "application/json" },
      })
      if (response) {
        const { setFlashMessage, setFlashShow } = useStore();
        if (response.data.message) {
          setFlashMessage(response.data.message);
          setFlashShow(2);
        }
        router.push('/');
      }
    } catch(err) {
      errors.value = err.response ? err.response.data.errors : [config.defaultErrorMessage]
    }
    
  };

  const sumbitForm = () => {
    if (validateForm()) {
      sendForm();
    }
  };
  return { username, password, rememberMe, errors, sumbitForm };
};
