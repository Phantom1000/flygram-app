export default {
  validateString(
    string,
    key,
    errors,
    required = true,
    requiredMessage = '',
    min = 1,
    minMessage = '',
    max = 100,
    maxMessage = '',
    spaces = true,
    spacesMessage = '',
    pattern = '',
    patternMessage = ''
  ) {
    if (string === '' && required) {
      errors.value[key].push(requiredMessage)
    } else if (string.length < min) {
      errors.value[key].push(minMessage)
    } else if (string.length > max) {
      errors.value[key].push(maxMessage)
    } else if (pattern && !pattern.test(string) && string !== '') {
      errors.value[key].push(patternMessage)
    }
    if (!spaces && string.includes(' ')) {
      errors.value[key].push(spacesMessage)
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
