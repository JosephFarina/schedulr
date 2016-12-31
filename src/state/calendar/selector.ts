import * as M from 'moment'

import * as Models from './../../models'

export const getCalendarState = (state: Models.RState): Models.RCalendar => state.calendar
export const getDate = (state: Models.RState): string => state.calendar.date
export const getMomentDate = (state: Models.RState): M.Moment => M(state.calendar.date)
