import * as M from 'moment'

export function isString(x: any) {
  return Object.prototype.toString.call(x) === "[object String]"
}

export function isMoment(x: any) {
  return M.isMoment(x)
}
