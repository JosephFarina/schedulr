import {generateShifts} from './generateShifts'
import * as I from 'src/models'

export function getShifts(date: string): Promise<I.Shifts> {
  return Promise.resolve(generateShifts(date))
}
