export default {
  formatDate(date) {
    const MONTHS = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октрября',
      'ноября',
      'декабря'
    ]
    let result = new Date(date)
    return `${result.getDate()} ${MONTHS[result.getMonth()]} ${result.getFullYear()}`
  },

  validateString(
    string,
    key,
    min,
    max,
    errors,
    input_message,
    min_message,
    max_message,
    spaces_message = '',
    spaces = true,
    required = true
  ) {
    if (string === '' && required) {
      errors.value[key].push(input_message)
    } else if (string.length < min) {
      errors.value[key].push(min_message)
    } else if (string.length > max) {
      errors.value[key].push(max_message)
    }
    if (!spaces && string.includes(' ')) {
      errors.value[key].push(spaces_message)
    }
  },

  toCamel(o) {
    let newO, origKey, newKey
    newO = {}
    for (origKey in o) {
      newKey = origKey
      let words = origKey.split('_')
      newKey = words
        .map((word, index) => {
          if (index > 0) return word.at(0).toUpperCase() + word.slice(1)
          else return word
        })
        .join('')
      newO[newKey] = o[origKey]
    }
    return newO
  }
}
