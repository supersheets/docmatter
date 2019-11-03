require('dotenv').config()
const { getTestDoc } = require('./util')
const { extractData } = require('../lib/matter')

describe('frontmatter', () => {
  it ('should parse with only one table at top of doc', async () => {
    let doc = getTestDoc('normal.test.json')
    let data = extractData(doc)
    expect(data).toEqual({ 
      title: 'A post with a cover image',
      date: '2019-01-07',
      published: 'true',
      tags: 'Markdown',
      series: 'false',
      cover_image: './images/alexandr-podvalny-220262-unsplash.jpg',
      canonical_url: 'false',
      description: 'Markdown is intended to be as easy-to-read and easy-to-write as is feasible. Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it\'s been marked up with tags or formatting instructions.' 
    })
  })
})
