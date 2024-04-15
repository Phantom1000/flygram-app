import { ref, onMounted } from "vue";
import axios from "axios";
import config from "@/config.js";

export const useUserPosts = () => {
  const user = ref(null);
  const posts = ref([]);
  const error = ref(null);
  const isLoading = ref(true);
  const getUserPosts = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/`);
      if (response) {
        user.value = response.data.user;
        posts.value = response.data.posts;
      }
    } catch(err) {
      error.value = err.response ? err.response.data : config.defaultErrorMessage;
    } finally {
      isLoading.value = false
    }
    
  };
  onMounted(getUserPosts);
  return { user, posts, error, isLoading };
};
