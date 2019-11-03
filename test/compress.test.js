require('dotenv').config()
const { getTestDoc } = require('./util')
const { compress, decompress } = require('../lib/compress')

describe('compress', () => {
  it ('should compress and decompress doc', async () => {
    let doc = getTestDoc('normal.test.json')
    let data = compress(doc)
    let uncompressed = decompress(data)
    expect(doc).toEqual(uncompressed)
  })
})
