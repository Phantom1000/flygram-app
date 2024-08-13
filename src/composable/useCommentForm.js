import { ref } from 'vue'
import { useFetch } from '@/composable/useFetch'
import { useToken } from '@/composable/useToken'
import utils from '@/utils.js'

export const useCommentForm = (comment = null) => {
  const newComment = ref(null)
  const text = ref(comment !== null ? comment.text : '')
  const errors = ref({
    text: []
  })
  const isLoading = ref(false)
  const { getToken } = useToken()

  const validateForm = () => {
    errors.value = {
      text: []
    }
    utils.validateString(
      text.value,
      'text',
      1,
      500,
      errors,
      '',
      'Комментарий не может быть пустым',
      'Длина комментария не может быть больше 500 символов',
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

  const submitForm = async (postId, comment = null) => {
    if (validateForm()) {
      errors.value = []
      isLoading.value = true
      const token = await getToken()
      const postData = {
        text: text.value,
        post_id: postId
      }
      const { data, error } = await useFetch(
        comment === null ? 'post' : 'put',
        comment === null ? 'comments' : `comments/${comment.id}`,
        postData,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      )
      if (error.value.length === 0) newComment.value = utils.toCamel(data.value.comment)
      errors.value = error.value
      isLoading.value = false
    }
  }
  return {
    text,
    newComment,
    errors,
    isLoading,
    submitForm
  }
}
