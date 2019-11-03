require('dotenv').config()
const { getTestDoc } = require('./util')
const docmatter = require('../index')

describe('docmatter', () => {
  it ('should get data and content with no options', async () => {
    let doc = getTestDoc('normal.test.json')
    let res = docmatter(doc)
    expect(res).toEqual({
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
})
