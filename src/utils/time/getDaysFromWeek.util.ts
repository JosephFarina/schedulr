import * as M from 'moment'
import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'

export function getDaysFromWeek(date: MorString): M.Moment[] {
  const week = cloneOrCreateMo(date)
  const startOfWeek = week.clone().startOf('week').hour(12)
  const endOfWeek = week.clone().endOf('week').hour(12)

  const currDay = startOfWeek.clone()
  const weekDays = []

  while (currDay < endOfWeek) {
    weekDays.push(currDay.clone())
    currDay.add(1, 'day')
  }

  return weekDays
}
