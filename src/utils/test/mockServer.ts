import * as I from './../../models'
import {generateShifts} from './generateShifts'

export function getShifts(date: string): Promise<I.Shifts> {
  return Promise.resolve(generateShifts(date))
}
