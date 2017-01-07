import * as M from 'moment'

import * as Models from 'src/models'
import { ActionTypes } from 'src/state/actionTypes'

export const initialState: Models.RCalendar = {
  date: M().format(),
  timeRange: 'week',
}

const calendar = (state = initialState, action: Models.Action<Models.RCalendar>): Models.RCalendar => {
  switch (action.type) {

    case ActionTypes.updateDate:
      return Object.assign({}, state, {
        date: action.payload.date
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
