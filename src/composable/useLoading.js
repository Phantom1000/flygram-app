import { onUnmounted } from 'vue'

export const useLoading = (page, getContent, isLoading, meta, ...args) => {
  const checkPosition = async () => {
    const height = document.body.offsetHeight
    const screenHeight = innerHeight
    const scrolled = scrollY

    const threshold = height - screenHeight / 4
    const position = scrolled + screenHeight
    const condition = position >= threshold
    if (condition) {
      if (isLoading.value || meta.value.totalPages <= page.value) return

      await getContent(++page.value, ...args)
    }
  }

  const throttle = (callee, timeout) => {
    let timer = null

    return (...args) => {
      if (timer) return

      timer = setTimeout(() => {
        callee(...args)
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }

  const callback = throttle(checkPosition, 250)

  addEventListener('scroll', callback)
  addEventListener('resize', callback)

  onUnmounted(() => {
    removeEventListener('scroll', callback)
    removeEventListener('resize', callback)
  })
}
