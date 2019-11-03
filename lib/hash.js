const { createHash } = require('crypto')

function hash(obj) {
  return createHash('sha1').update(JSON.stringify(obj)).digest('base64')
}

module.exports = {
  hash
}

