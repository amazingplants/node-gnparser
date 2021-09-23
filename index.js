const addon = require('bindings')('gnparser')

function parse(names) {
  let res
  if (Array.isArray(names) && names.every(n => (typeof n === 'string'))) {
    res = addon.parseArrayToString(names)
  } else if(typeof names === 'string') {
    res = addon.parseToString(names)
  } else {
    throw('Argument must be a string or array of strings')
  }
  return JSON.parse(res)
}

const parsed = parse('Pardosa moesta Banks, 1892')

console.log(parsed)

module.exports = {
  parse
}