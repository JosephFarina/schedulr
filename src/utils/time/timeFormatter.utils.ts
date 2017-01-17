import * as M from 'moment'

import {
  MorString,
  cloneOrCreateMo,
  roundToTwoPlaces
} from 'src/utils'


export const getDayOfMonth = (input: MorString) => {
  const date = cloneOrCreateMo(input)
  return date.date()
}

export const monthFromNumber = (month: number): string => {
  return M().month(month).format('MMM')
}

export const durationAsString = (duration: number): string => {
  const durationInHours = roundToTwoPlaces(duration / 60)
  const hour = durationInHours === 1 ? 'Hour' : 'Hours'
  return `${durationInHours} ${hour}`
}
