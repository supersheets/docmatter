require('dotenv').config()
const { getTestDoc } = require('./util')
const { getPlainText, createContentDoc, getContentBlocks, getDataStartEnd, getDoubleHRStartEnd } = require('../lib/content')

describe('content', () => {
  it ('should get indexes of the data front matter', async () => {
    let doc = getTestDoc('normal.test.json')
    let indexes = getDataStartEnd(doc)
    expect(indexes).toMatchObject({
      startIndex: 2, 
      endIndex: 503
    })
  })
  it ('should get the indexes of double hr', async () => {
    let doc = getTestDoc('normal.test.json')
    let indexes = getDoubleHRStartEnd(doc)
    expect(indexes).toMatchObject({
      startIndex: 1058,
      endIndex: 1064
    })
  })
  it ('should get the blocks between data and doublehr', async () => {
    let doc = getTestDoc('normal.test.json')
    let blocks = getContentBlocks(doc)
    expect(blocks.length).toBe(10)
    expect(blocks[0]).toMatchObject({
      startIndex: 503,
      endIndex: 512
    })
    expect(blocks[9]).toMatchObject({
      startIndex: 1057,
      endIndex: 1058
    })
  })
  it ('should return a doc with content between data and double hr', async () => {
    let doc = getTestDoc('normal.test.json')
    let contentdoc = createContentDoc(doc)
    expect(contentdoc).toMatchObject({
      documentId: doc.documentId,
      title: doc.title,
      body: {
        content: expect.anything()
      },
      documentStyle: doc.documentStyle,
      namedStyles: doc.namedStyles,
      suggestionsViewMode: doc.suggestionsViewMode,
      inlineObjects: doc.inlineObjects
    })
  })
  it ('should return a doc with lists if doc has lists', async () => {
    let doc = getTestDoc('lists.test.json')
    let contentdoc = createContentDoc(doc)
    expect(contentdoc).toMatchObject({
      lists: doc.lists
    })
  })
  it ('should return as plain text', async () => {
    let doc = getTestDoc('normal.test.json')
    let contentdoc = createContentDoc(doc)
    let text = getPlainText(contentdoc)
    expect(text).toEqual(expect.stringContaining("My Title\nSubheading 1\n"))
  })
})
