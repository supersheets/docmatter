const DEFAULT_LENGTH = 128

function excerpt(s, options) {
  if (!s) return null
  maxlength = options.length || DEFAULT_LENGTH
  let suffix = options.suffix || ''
  let n = maxlength - suffix.length
  if (s.length > maxlength) {
    return `${s.substring(0, n)}${suffix}`
  }
  return s
}

module.exports = {
  excerpt
}