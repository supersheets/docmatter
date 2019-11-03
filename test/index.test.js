require('dotenv').config()
const { getTestDoc } = require('./util')
const docmatter = require('../index')

describe('docmatter', () => {
  it ('should get data and content with no options', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc)
    expect(res).toEqual({
      id: "1NGJ5Q7g0lOzxDTL8TjY1v43S3rzA4ZSx1hhPgHWRb6c",
      title: "Docmatter Test File",
      data: expect.anything(),
      content: expect.anything()
    })
  })
  it ('should include text option', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc, { text: true })
    expect(res).toMatchObject({
      text: expect.anything()
    })
  })
  it ('should include images option', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc, { images: true })
    expect(res).toMatchObject({
      images: expect.anything()
    })
  })
  it ('should compress the content doc', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc, { compress: true })
    expect(res.content_compressed.length).toEqual(2780)
  })
  it ('should generate a hash of the doc', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc, { hash: true })
    expect(res.hash).toEqual("KpuV9PU/Vb29UtpfpVwQzRZYoAw=")
  })
  it ('should generate an excerpt', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc, { excerpt: true })
    expect(res.excerpt.length).toEqual(128)
    res = docmatter(doc, { excerpt: 16 })
    expect(res.excerpt.length).toBe(16)
  })
})
