'use strict'

var buffer = require('is-buffer')
var yamlParse = require('js-yaml').load

module.exports = matter

function matter(file, options) {
  options = options || {}
  var strip = options.strip
  var yamlOptions = options.yaml || {}
  var doc = String(file)
  var match = /^---(?:\r?\n|\r)(?:([\s\S]*)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(
    doc
  )

  if (match) {
    file.data.matter = yamlParse(
      match[1],
      Object.assign(yamlOptions, {filename: file.path})
    )

    if (strip) {
      doc = doc.slice(match[0].length)
      file.contents = buffer(file.contents) ? Buffer.from(doc) : doc
    }
  } else {
    file.data.matter = {}
  }

  return file
}
