
const jessy = require('jessy')

function getInlineImageObjects(doc) {
  let images = [ ]
  for (let id in doc.inlineObjects) {
    let obj = doc.inlineObjects[id]
    if (isImage(obj)) {
      images.push(extractImageProperties(obj))
    }
  }
  return images
}

function isImage(obj) {
  let imageUri = jessy("inlineObjectProperties.embeddedObject.imageProperties.contentUri", obj)
  return imageUri && true || false
}

function extractImageProperties(obj) {
  let image = obj.inlineObjectProperties.embeddedObject
  let uri = jessy("imageProperties.contentUri", image)
  let height = jessy("size.height.magnitude", image)
  let width = jessy("size.width.magnitude", image)
  let unit = jessy("size.height.unit", image)
  return { uri, height, width, unit }
}

module.exports = {
  getInlineImageObjects
}