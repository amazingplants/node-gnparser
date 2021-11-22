const addon = require('bindings')('gnparser')

function parse(names, options) {
  options = options || {}
  let { details, cultivars, diaereses, removeDiaereses } = options
  if(!!removeDiaereses) { diaereses = true }
  let res
  if (Array.isArray(names) && names.every(n => (typeof n === 'string'))) {
    res = addon.parseArrayToString(names, !!details, !!cultivars, !!diaereses)
  } else if(typeof names === 'string') {
    res = addon.parseToString(names, !!details, !!cultivars, !!diaereses)
  } else {
    throw('Argument must be a string or array of strings')
  }
  const parsedRes = JSON.parse(res)
  if (removeDiaereses) {
    if (Array.isArray(parsedRes)) {
      for (var nameObj of parsedRes) {
        nameObj = transliterateNameDiaereses(nameObj)
      }
    } else {
      return transliterateNameDiaereses(parsedRes)
    }
  }
  return parsedRes
}

function transliterateNameDiaereses(nameObj) {
  nameObj.normalized = transliterateStringDiaereses(nameObj.normalized)
  nameObj.canonical.simple = transliterateStringDiaereses(nameObj.canonical.simple)
  nameObj.canonical.full = transliterateStringDiaereses(nameObj.canonical.full)
  transliterateObjectDiaereses(nameObj.details)
  if (Array.isArray(nameObj.words)) {
    for (var word of nameObj.words) {
      word.normalized = transliterateStringDiaereses(word.normalized)
    }
  }
  return nameObj
}

function transliterateObjectDiaereses(obj) {
  for (var key in obj) {
    if (key === "genus" || key === "species" || key === "infraspecies") {
      if (typeof obj[key] === 'string') {
        obj[key] = transliterateStringDiaereses(obj[key])
      }
      if (typeof obj[key] === 'object') {
        transliterateObjectDiaereses(obj[key])
      }
      if (Array.isArray(obj[key])) {
        for (var item of obj[key]) {
          if (typeof item === 'object' && item.value) {
            item.value = transliterateStringDiaereses(item.value)
          }
        }
      }
    }
  }
}

function transliterateStringDiaereses(str) {
  if (str) {
    str = str.replace(/[äëïöü]/g, match => {
      return diaereses[match]
    })
  }
  return str
}

const diaereses = {
  ä: 'a',
  ë: 'e',
  ï: 'i',
  ö: 'o',
  ü: 'u'
}

module.exports = {
  parse
}