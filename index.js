const addon = require('bindings')('gnparser')

function parse(names, options) {
  options = options || {}
  const { details, cultivars } = options
  let res
  if (Array.isArray(names) && names.every(n => (typeof n === 'string'))) {
    res = addon.parseArrayToString(names, !!details, !!cultivars)
  } else if(typeof names === 'string') {
    res = addon.parseToString(names, !!details, !!cultivars)
  } else {
    throw('Argument must be a string or array of strings')
  }
  return JSON.parse(res)
}

module.exports = {
  parse
}