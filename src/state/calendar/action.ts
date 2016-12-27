import * as Models from './../../models'
import * as DateUtils from './../../utils/date.utils'
import { ActionTypes } from './../actionTypes'

/**
 * 
 * Time Range Switching
 * 
 */

export const switchTimeRangeToMonth = (): Models.Action<Models.RCalendar> => {
  return {
    type: ActionTypes.updateTimeRange,
    payload: {
      timeRange: 'month'
    }
  }
}


export const switchTimeRangeToWeek = (): Models.Action<Models.RCalendar> => {
  return {
    type: ActionTypes.updateTimeRange,
    payload: {
      timeRange: 'week'
    }
  }
}

/**
 * 
 * Start Date Manipulating
 * 
 */


export const nextTimeRange = () => {
  return (dispatch: Function, getState: Function): void => {
    const calendar: Models.RCalendar = getState().calendar
    const { startDate, timeRange } = calendar
    dispatch()
  }
}
