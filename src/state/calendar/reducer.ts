import * as M from 'moment'

import * as Models from './../../models'
import * as DateUtils from './../../utils/date.utils'
import { ActionTypes } from './../actionTypes'

const initialState: Models.RCalendar = {
  startDate: DateUtils.startOfMonth(M()).format(),
  timeRange: 'month',
  month: M().month()
}

const calendar = (state = initialState, action: Models.Action<Models.RCalendar>): Models.RCalendar => {

  switch (action.type) {

    case ActionTypes.nextTimeRange:
      return Object.assign({}, state, {

      })

    case ActionTypes.previousTimeRange:
      return Object.assign({}, state, {

      })

    case ActionTypes.currentTimeRange:
      return Object.assign({}, state, {

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
