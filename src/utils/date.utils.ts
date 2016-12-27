import * as M from 'moment'
require('moment-range')

import * as Models from './../models'



// GET BEGIN AND END OF TIME RANGES



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



// NEXT, CURR, PREVIOUS START DATE BY TIMERANGE



/**
 * @Param{Calendar Slice of the state}
 * @Returns the next startDate based on the curr one and the time range option
 */

// TODO: for month needs to calculate the curr month and do calculations based on that
// maybe store the curr month somewhere else so its easy to just add 1 month 

export const nextRange = (state: Models.RCalendar): string => {
  const {startDate, timeRange, month} = state
  const currDate = M(startDate)
  let nextTime: M.Moment

  if (timeRange === 'month') {
    nextTime = startOfMonth(currDate.month(month + 1))
  } else if (timeRange === 'week') {
    nextTime = startOfWeek(currDate).add(1, 'week')
  }

  return nextTime.format()
}

export const previousRange = (state: Models.RCalendar): string => {
  const {startDate, timeRange, month} = state
  const currDate = M(startDate)
  let nextTime: M.Moment

  if (timeRange === 'month') {
    nextTime = startOfMonth(currDate.month(month - 1))
  } else if (timeRange === 'week') {
    nextTime = startOfWeek(currDate).subtract(1, 'week')
  }

  return nextTime.format()
}

export const currentRange = (state: Models.RCalendar): string => {
  const {timeRange} = state
  let nextTime: M.Moment

  if (timeRange === 'month') {
    nextTime = startOfMonth(M())
  } else if (timeRange === 'week') {
    nextTime = startOfWeek(M())
  }

  return nextTime.format()
}


// TIME RANGE



/**
 * @Params{Moment.Range}
 * @Returns Model.WeekRange Interface
 */

export const getTimeRangeBuild = (range: M.Range): Models.TimeRange => {
  const weekRange: Models.TimeRange = {
    weeks: {}
  }

  range.by('weeks', (m) => {
    const week = M.range([
      startOfWeek(m),
      endOfWeek(m)
    ])

    weekRange.weeks[+m.week()] = {
      days: dayRangeInWeek(week),
      endDate: m.clone().day(6).format(),
      startDate: m.clone().day(0).format()
    }
  })

  weekRange.month = getMonthFromRange(range)
  return weekRange
}

/**
 * @Param {Moment.Range}
 * @Returns the most common month value
 * it iterates over each day and takes a count of the month numbers and returns the mode
 */

export function getMonthFromRange(range: M.Range): number {
  const months: { [monthNumber: number]: number } = {}
  range.by('day', (m) => {
    if (!months[m.month()]) { months[m.month()]++ }
    months[m.month()]++
  })

  return +Object.keys(months).reduce((max, key, i) => {
    return months[max] > months[key] ? max : key
  })
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

/**
 * 
 * @Param{M.Range}
 * Returns a string array of each week in the range
 * 
 */

export const getWeeksInRange = (range: M.Range): string[] => {
  const weeks: number[] = []
  range.by('day', (m) => {
    weeks.push(m.week())
  })
  const filteredWeeks: string[] = []
  weeks.forEach((week) => {
    if (filteredWeeks.indexOf('' + week) === -1) {
      filteredWeeks.push('' + week)
    }
  })
  return filteredWeeks
}
