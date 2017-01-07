import {
  MorString,
  cloneOrCreateMo,
} from './momentHelpers.util'
import * as M from 'moment'
import * as I from 'src/models'

export function getWeeksFromMonth(month: MorString): M.Moment[] {
  const baseDate = cloneOrCreateMo(month)
  const startWeekOfMonth: number = baseDate.clone().startOf('month').hour(12).week()
  const endWeekOfMonth: number = baseDate.clone().endOf('month').hour(12).week()

  let currWeek: number = startWeekOfMonth
  const currDate = baseDate.clone()

  const weeks: M.Moment[] = []

  while (currWeek <= endWeekOfMonth) {
    weeks.push(currDate.clone().week(currWeek))
    currWeek++
  }

  return weeks
}
