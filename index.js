const { extractData } = require('./lib/matter')
const { createContentDoc, getPlainText } = require('./lib/content')
const { getInlineImageObjects } = require('./lib/images')
const { compress } = require('./lib/compress')
const { hash } = require('./lib/hash')
const { excerpt } = require('./lib/excerpt')
const DEFAULT_EXCERPT_LENGTH = 128

function docmatter(doc, options) {
  options = options || { }
  let id = doc.documentId
  let title = doc.title
  let data = extractData(doc)
  let content = createContentDoc(doc)
  let ret = { id, title, data, content }
  if (options.text) {
    ret.text = getPlainText(content)
  }
  if (options.images) {
    ret.images = getInlineImageObjects(doc)
  }
  if (options.hash) {
    ret.hash = hash(doc)
  }
  if (options.compress) {
    ret.content_compressed = compress(ret.content)
  }
  if (options.excerpt) {
    let length = (typeof options.excerpt === "number") && options.excerpt || DEFAULT_EXCERPT_LENGTH
    ret.excerpt = excerpt((ret.text || getPlainText(content)), { length })
  }
  return ret
}

module.exports = docmatter