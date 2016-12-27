import * as M from 'moment'

import * as Models from './../../models'
import * as DateUtils from './../../utils/date.utils'

export const getCurrentTimeRange = (state: Models.RState): { start: string, end: string } => {
  const { calendar } = state
  const { startDate, timeRange } = calendar

  // Have this check the timerange if it is month or week and return
  // corresponding end
  return {
    start: startDate,
    end: DateUtils.endOfMonth(M(startDate)).format()
  }
}

export const getCalendarState = (state: Models.RState): Models.RCalendar => {
  return state.calendar
}
