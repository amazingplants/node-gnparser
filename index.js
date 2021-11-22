const addon = require('bindings')('gnparser')

function parse(names, options) {
  options = options || {}
  let { details, cultivars, diaereses } = options
  // default `diaereses` to true
  if (typeof diaereses === 'undefined') { diaereses = true }
  let res
  if (Array.isArray(names) && names.every(n => (typeof n === 'string'))) {
    res = addon.parseArrayToString(names, !!details, !!cultivars, !!diaereses)
  } else if(typeof names === 'string') {
    res = addon.parseToString(names, !!details, !!cultivars, !!diaereses)
  } else {
    throw('Argument must be a string or array of strings')
  }
  return JSON.parse(res)
}

module.exports = {
  parse
}