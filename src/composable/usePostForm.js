import { ref, watch } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import utils from '@/utils.js'

export const usePostForm = () => {
  const hashtags = ref('')
  const text = ref('')
  const image = ref('')
  const errors = ref([])
  const isLoading = ref(false)
  const { getToken } = useToken()
  const validateHashtags = () => {
    errors.value.hashtags = []
    utils.validateString(
      hashtags.value,
      'hashtags',
      errors,
      false,
      '',
      0,
      '',
      100,
      'Длина хэштегов не может быть больше 100 символов',
      false,
      'Хэштеги не могут содержать пробелы'
    )
  }

  const validateText = () => {
    errors.value.text = []
    utils.validateString(
      text.value,
      'text',
      errors,
      true,
      'Текст не может быть пустым',
      1,
      'Текст не может быть пустым',
      500,
      'Длина текста не может быть больше 500 символов'
    )
  }

  watch(hashtags, validateHashtags)
  watch(text, validateText)

  const validateForm = () => {
    errors.value = {}
    validateHashtags()
    validateText()
    let result = true
    for (let field in errors.value) {
      if (errors.value[field].length > 0) {
        result = false
      }
    }
    return result
  }

  const submitForm = async (post = null, community = null) => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()
      const postData = new FormData()
      postData.append('hashtags', hashtags.value)
      postData.append('text', text.value)
      if (image.value) postData.append('image', image.value)
      if (community) postData.append('community_id', community)

      const { data, error } = await useFetch(
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
      isLoading.value = false
      if (errors.value.length === 0) {
        hashtags.value = ''
        text.value = ''
        if (data.value.post) {
          return utils.toCamel(data.value.post)
        }
      }
    }
  }
  return {
    hashtags,
    text,
    image,
    errors,
    isLoading,
    submitForm
  }
}
