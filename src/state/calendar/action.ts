import * as Selectors from './selector'
import * as Models from 'src/models'
import { CalendarActions } from 'src/state/actionTypes'
import {
  nextWeek,
  previousWeek,
} from 'src/utils'


/**
 * 
 * Time Range Switching
 * 
 */


export const switchTimeRangeToMonth = (): Models.Action<Models.RCalendar> => {
  return {
    type: CalendarActions.updateTimeRange,
    payload: {
      timeRange: 'month'
    }
  }
}


export const switchTimeRangeToWeek = (): Models.Action<Models.RCalendar> => {
  return {
    type: CalendarActions.updateTimeRange,
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
  return generateTimeRangeAction(nextWeek)
}

export const previousTimeRange = () => {
  return generateTimeRangeAction(previousWeek)
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
    type: CalendarActions.updateDate,
    payload: {
      date
    }
  }
}
