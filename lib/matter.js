const { JSONPath } = require('jsonpath-plus')

function extractData(doc) {
  let tables = extractTables(doc)
  if (!tables || tables.length == 0) {
    return { }
  }
  return matchKeysAndValues(tables[0])
}

function extractTables(doc) {
  let path = "$..table"
  let tables = JSONPath(path, doc)
  return tables.filter(table => table.columns == 2).map(table => extractCells(table))
}

function extractCells(table) {
  let path = "$..tableCells[*][content]"
  let cells = JSONPath(path, table)
  return cells.map(cell => textValue(cell))
}

function textValue(cell) {
  let path = "$..elements..textRun..content"
  let paragraphs = JSONPath(path, cell)
  return paragraphs[0].trim()
}

function matchKeysAndValues(cells) {
  let values = { }
  let key = null
  for (let value of cells) {
    if (!key) {
      key = value
    } else {
      values[key] = value
      key = null
    }
  }
  return values
}

module.exports = {
  extractData
}