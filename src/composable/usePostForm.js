import { ref } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useTokenStore } from '@/store/token'
import utils from '@/utils.js'

export const usePostForm = () => {
  const hashtags = ref('')
  const text = ref('')
  const image = ref('')
  const errors = ref([])

  const validateForm = () => {
    errors.value = {
      hashtags: [],
      text: [],
      image: []
    }
    utils.validateString(
      hashtags.value,
      'hashtags',
      0,
      100,
      errors,
      '',
      '',
      'Длина хэштегов не может быть больше 100 символов',
      'Хэштеги не могут содержать пробелы',
      false,
      false
    )
    utils.validateString(
      text.value,
      'text',
      1,
      500,
      errors,
      '',
      'Текст не может быть пустым',
      'Длина текста не может быть больше 500 символов',
      '',
      true,
      false
    )
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async (post = null) => {
    if (validateForm()) {
      errors.value = []
      const { token } = useTokenStore()
      const postData = new FormData()
      postData.append('hashtags', hashtags.value.trim())
      postData.append('text', text.value.trim())
      if (image.value) postData.append('image', image.value)

      const { error } = await useFetch(
        post === null ? 'post' : 'put',
        post === null ? 'posts' : `post/${post.id}`,
        postData,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data'
        }
      )
      errors.value = error.value
      if (errors.value.length === 0) {
        hashtags.value = ''
        text.value = ''
      }
    }
  }
  return {
    hashtags,
    text,
    image,
    errors,
    submitForm
  }
}
