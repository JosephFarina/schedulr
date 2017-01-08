import * as M from 'moment'

export function isString(x: any): boolean {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function isMoment(x: any): boolean {
  return M.isMoment(x)
}

export function isArray(x: any): boolean {
  return x.constructor === Array
}
