import * as Models from './../../models'
import * as DateUtils from './../../utils/dateHelpers.utils'
import { ActionTypes } from './../actionTypes'

export const initialState: Models.RCalendar = {
  startDate: DateUtils.startOfWeek().format(),
  timeRange: 'week',
}

const calendar = (state = initialState, action: Models.Action<Models.RCalendar>): Models.RCalendar => {

  switch (action.type) {

    case ActionTypes.updateStartDate:
      return Object.assign({}, state, {
        startDate: action.payload.startDate
      })

    case ActionTypes.updateTimeRange:
      return Object.assign({}, state, {
        timeRange: action.payload.timeRange
      })

    default:
      return state
  }
}

export default calendar
