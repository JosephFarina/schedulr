const uniqueId = require('lodash.uniqueid')

export function uuid() {
  return uniqueId(`client_generated_${Math.floor(Math.random() * 10000000)}_`)
}