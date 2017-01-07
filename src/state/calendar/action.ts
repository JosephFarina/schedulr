import * as Selectors from './selector'
import * as Models from 'src/models'
import { ActionTypes } from 'src/state/actionTypes'
import * as DateUtils from 'src/utils/dateHelpers.utils'


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
  return generateTimeRangeAction(DateUtils.nextWeek)
}

export const previousTimeRange = () => {
  return generateTimeRangeAction(DateUtils.previousWeek)
}

export const currentTimeRange = () => {
  // return generateTimeRangeAction(DateUtils.currentRange)
}

function generateTimeRangeAction(action: Function) {
  return (dispatch: Function, getState: Function): void => {
    const calendar = Selectors.getCalendarState(getState())
    const nextStartDate = action.call(null, calendar.date).format()
    dispatch(changeTimeRange(nextStartDate))
  }
}

function changeTimeRange(date: string): Models.Action<Models.RCalendar> {
  return {
    type: ActionTypes.updateDate,
    payload: {
      date
    }
  }
}
