import * as Models from './../../models'
// import * as DateUtils from './../../utils/date.utils'
import { ActionTypes } from './../actionTypes'
import * as Selectors from './selector'


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

// export const nextTimeRange = () => {
//   return generateTimeRangeAction(DateUtils.nextRange)
// }

// export const previousTimeRange = () => {
//   return generateTimeRangeAction(DateUtils.previousRange)
// }

// export const currentTimeRange = () => {
//   return generateTimeRangeAction(DateUtils.currentRange)
// }

// TODO: Test that this works
function generateTimeRangeAction(selector: Function) {
  return (dispatch: Function, getState: Function): void => {
    const calendar = Selectors.getCalendarState(getState())
    const nextStartDate = selector.call(null, calendar)
    dispatch(changeTimeRange(nextStartDate))
  }
}

function changeTimeRange(startDate: string): Models.Action<Models.RCalendar> {
  return {
    type: ActionTypes.updateStartDate,
    payload: {
      startDate
    }
  }
}
