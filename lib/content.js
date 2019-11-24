const { JSONPath } = require('jsonpath-plus')

function createContentDoc(doc) {
  return {
    documentId: doc.documentId,
    title: doc.title,
    body: {
      content: getContentBlocks(doc)
    },
    documentStyle: doc.documentStyle,
    namedStyles: doc.namedStyles,
    suggestionsViewMode: doc.suggestionsViewMode,
    inlineObjects: doc.inlineObjects,
    lists: doc.lists
  }
}

function getPlainText(doc) {
  let path = "$..textRun..content"
  let text = JSONPath(path, doc.body)
  return text.join('').trim()
}

function getContentBlocks(doc) {
  let blocks = [ ]
  let datatable = getDataStartEnd(doc)
  let doublehr = getDoubleHRStartEnd(doc)
  for (let block of doc.body.content) {
    if (block.startIndex >= datatable.endIndex 
      && block.endIndex <= doublehr.startIndex) {
        blocks.push(block)
      }
  }
  return blocks
}

function isHrBlock(block) {
  let hr = block.paragraph && block.paragraph.elements && block.paragraph.elements[0].horizontalRule
  return hr && true || false
}

function isDataTable(block) {
  return block.table && block.table.columns == 2 || false
}

function getDataStartEnd(doc) {
  let startIndex = -1
  let endIndex = -1
  let table = doc.body.content.find(block => isDataTable(block))
  if (table) {
    startIndex = table.startIndex
    endIndex = table.endIndex
  }
  return {
    startIndex,
    endIndex
  }
}

function getDoubleHRStartEnd(doc) {
  let blocks = doc.body.content.filter(block => isHrBlock(block)).map(block => {
    return {
      startIndex: block.startIndex,
      endIndex: block.endIndex
    }
  })
  let prevStartIndex = -1
  let prevEndIndex = -1
  for (let hr of blocks) {
    if (prevStartIndex == -1 && prevEndIndex == -1) {
      prevStartIndex = hr.startIndex
      prevEndIndex = hr.endIndex
      continue
    }
    if ((hr.startIndex - prevEndIndex) == 1) { // '\n' block in between
      return {
        startIndex: prevStartIndex,
        endIndex: hr.endIndex + 1  // followed by '\n' block
      }
    }
  }
  let lastIndex = doc.body.content[doc.body.content.length-1].endIndex
  return {
    startIndex: lastIndex,
    endIndex: lastIndex
  }
}

module.exports = {
  getPlainText,
  createContentDoc,
  getContentBlocks,
  getDataStartEnd,
  getDoubleHRStartEnd
}

