import * as M from 'moment'
require('moment-range')
import { createSelector } from 'reselect'

import * as Models from './../../models'
import * as DateUtils from './../../utils/dateHelpers.utils'

export const getCalendarState = (state: Models.RState): Models.RCalendar => state.calendar
export const getStartDay = (state: Models.RState): string => state.calendar.startDate

export const getTimeRangeBuild = createSelector(
  getStartDay,
  (startDate) => DateUtils.generateCalendarBuildDateOnly(
    startDate,
    DateUtils.endOfWeek(startDate)
  )
)

export const getCurrentMonthBuild = createSelector(
  getStartDay,
  (startDate) => generateMonthTimeRangeBuild(startDate)
)

function generateMonthTimeRangeBuild(startDate: string) {
  const { year, month } = DateUtils.getWeekMonthAndYearFromDate(startDate)

  const range: Models.CalendarObject<Models.DateOnly> = DateUtils.generateCalendarBuildDateOnly(
    DateUtils.startOfMonth(month, year),
    DateUtils.endOfMonth(month, year),
  )

  range.month = month

  return range
}
