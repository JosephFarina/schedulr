import * as I from './../models'
import {
  MorString,
  cloneOrCreateMo,
} from './momentHelpers.util'
import * as M from 'moment'

export function getWeeksFromMonth(month: MorString): M.Moment[][] {
  const baseDate = cloneOrCreateMo(month)
  const firstDayOfMonth = baseDate.clone().startOf('month').hour(12)
  const lastDayOfMonth = baseDate.clone().endOf('month').hour(12)

  const currentDay = firstDayOfMonth.clone()
  const weeksInMonth: M.Moment[][] = []
  let currentWeek: M.Moment[] = []

  for (let i = 0; i < currentDay.weekday(); i++) {
    const prevDay = currentDay.clone().subtract(i + 1, 'day')
    currentWeek.unshift(prevDay)
  }

  while (currentDay < lastDayOfMonth) {
    currentWeek.push(currentDay.clone())
    currentDay.add(1, 'day')

    if (currentDay.weekday() === 0) {
      weeksInMonth.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentDay.weekday() !== 0) {
    for (let j = currentDay.weekday(); j < 7; j++) {
      const nextDay = currentDay.clone().add(j + 1, 'day')
      currentWeek.push(nextDay)
    }

    weeksInMonth.push(currentWeek)
  }


  return weeksInMonth
}
