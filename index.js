const { extractData } = require('./lib/matter')
const { createContentDoc, getPlainText } = require('./lib/content')
const { getInlineImageObjects } = require('./lib/images')

function docmatter(doc, options) {
  options = options || { }
  let data = extractData(doc)
  let content = createContentDoc(doc)
  let ret = { data, content }
  if (options.text) {
    ret.text = getPlainText(content)
  }
  if (options.images) {
    ret.images = getInlineImageObjects(doc)
  }
  return ret
}

module.exports = docmatter