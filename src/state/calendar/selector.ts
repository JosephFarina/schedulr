import * as M from 'moment'
import { Moment } from 'moment'

import {
  RCalendar,
  RState,
} from 'src/models'

export const getCalendarState = (state: RState): RCalendar => state.calendar
export const getDate = (state: RState): string => state.calendar.date
export const getMomentDate = (state: RState): Moment => M(state.calendar.date)
export const getTimeRange = (state: RState): string => state.calendar.timeRange

export const getCurrentTimeRange = (state: RState): M.Range => {
  const currDate = getMomentDate(state)
  const timeRange = getTimeRange(state)

  return M.range([
    currDate.clone().startOf(<any> timeRange).startOf('day'),
    currDate.clone().endOf(<any> timeRange).endOf('day')
  ])
}
