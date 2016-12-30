import * as M from 'moment'
require('moment-range')
import { createSelector } from 'reselect'

import * as Models from './../../models'
import * as DateUtils from './../../utils/dateHelpers.utils'
import * as MomentHelpers from './../../utils/momentHelpers.util'

export const getCalendarState = (state: Models.RState): Models.RCalendar => state.calendar
export const getStartDay = (state: Models.RState): string => state.calendar.startDate

export const getTimeRangeBuild = createSelector(
  getStartDay,
  (startDate) => DateUtils.generateTimeRangeBuild(
    startDate,
    DateUtils.endOfWeek(startDate)
  )
)

export const getCurrentMonthBuild = createSelector(
  getStartDay,
  (startDate) => generateMonthTimeRangeBuild(startDate)
)

function generateMonthTimeRangeBuild(startDate: string) {
  const week = MomentHelpers.getWeek(startDate)
  const year = MomentHelpers.getYear(startDate)
  const month = DateUtils.getMonthFromWeek(week, year)

  const range: Models.CalendarObject<Models.DayOnly> = DateUtils.generateTimeRangeBuild(
    DateUtils.startOfMonth(month, year),
    DateUtils.endOfMonth(month, year),
  )

  range.month = month

  return range
}
