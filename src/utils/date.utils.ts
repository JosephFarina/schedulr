import * as M from 'moment'
require('moment-range')

import * as Models from './../models'


/**
 * @Params{Moment Object}
 * @Returns the first Sunday of the month
 */

export const startOfMonth = (input: M.Moment): M.Moment => {
  const date = input.clone()
  return date.startOf('month').startOf('week').startOf('day')
}

/**
 * @Params{Moment Object}
 * @Returns the last Saturday of the month
 */

export const endOfMonth = (input: M.Moment): M.Moment => {
  const date = input.clone()
  return date.endOf('month').endOf('week').startOf('day')
}

/**
 * @Params{Moment Object}
 * @Returns the first sunday of the week
 */

export const startOfWeek = (input: M.Moment): M.Moment => {
  const date = input.clone()
  return date.startOf('week').startOf('day')
}

/**
 * @Params{Moment Object}
 * @Returns the last saturday of the week
 */

export const endOfWeek = (input: M.Moment): M.Moment => {
  const date = input.clone()
  return date.endOf('week').startOf('day')
}

/**
 * @Params{Moment.Range}
 * @Returns Model.WeekRange Interface
 */

export const getTimeRangeBuild = (range: M.Range): Models.TimeRange => {
  const weekRange: Models.TimeRange = {}

  range.by('weeks', (m) => {
    const week = M.range([
      startOfWeek(m),
      endOfWeek(m)
    ])

    weekRange[+m.week()] = {
      days: dayRangeInWeek(week),
      endDate: m.clone().day(6).format(),
      startDate: m.clone().day(0).format()
    }
  })

  return weekRange
}

function dayRangeInWeek(range: M.Range): { [dayNumber: number]: Models.Day } {
  const days: { [dayNumber: number]: Models.Day } = {}
  range.by('days', (m) => {
    days[m.day()] = {
      date: m.format(),
      isToday: m.isSame(M(), 'day')
    }
  })

  return days
}

