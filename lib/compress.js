
const zlib = require('zlib')

function compress(obj) {
  return zlib.gzipSync(Buffer.from(JSON.stringify(obj))).toString('base64')
}

function decompress(data) {
  return JSON.parse(zlib.gunzipSync(Buffer.from(data, 'base64')))
}

module.exports = {
  compress,
  decompress
}