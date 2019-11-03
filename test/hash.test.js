require('dotenv').config()
const { getTestDoc } = require('./util')
const { hash } = require('../lib/hash')

describe('compress', () => {
  it ('should hash a doc', async () => {
    let doc = getTestDoc('normal.test.json')
    let h = hash(doc)
    expect(h.length).toBe(28)
    expect(h).toEqual("KpuV9PU/Vb29UtpfpVwQzRZYoAw=")
  })
  it ('should generate different hash for two different docs', async () => {
    let doc = getTestDoc('normal.test.json')
    let copy = JSON.parse(JSON.stringify(doc))
    copy.title = "Different Title"
    let hdoc = hash(doc)
    let hcopy = hash(copy)
    expect(hdoc).not.toEqual(hcopy)
  })
})
