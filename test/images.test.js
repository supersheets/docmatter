require('dotenv').config()
const { getTestDoc } = require('./util')
const { getInlineImageObjects } = require('../lib/images')

describe('images', () => {
  it ('should get inline image objects', async () => {
    let doc = getTestDoc('normal.test.json')
    let images = getInlineImageObjects(doc)
    expect(images.length).toBe(1)
    expect(images[0]).toMatchObject({
      id: "kix.9tgu98jrxwha",
      uri: expect.stringMatching(/^https:\/\/(.*)\.googleusercontent\.com/),
      height: 220.875,
      width: 331.8968253968254,
      unit: "PT"
    })
  })
})
