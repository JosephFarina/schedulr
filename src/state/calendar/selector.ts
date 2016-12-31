import * as M from 'moment'
require('moment-range')
import { createSelector } from 'reselect'

import * as Models from './../../models'
import * as DateUtils from './../../utils/dateHelpers.utils'

export const getCalendarState = (state: Models.RState): Models.RCalendar => state.calendar
export const getStartDay = (state: Models.RState): string => state.calendar.startDate
