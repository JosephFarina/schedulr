import * as M from 'moment'

import {
  MorString,
  cloneOrCreateMo
} from 'src/utils'


export const getDayOfMonth = (input: MorString) => {
  const date = cloneOrCreateMo(input)
  return date.date()
}

export const monthFromNumber = (month: number): string => {
  return M().month(month).format('MMM')
}
