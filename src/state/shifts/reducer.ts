import * as Models from './../../models'
import { ActionTypes } from './../actionTypes'

export const initialState: Models.RShifts = {
  ids: [],
  shifts: {}
}

const shifts = (state = initialState, action: Models.Action<Models.RShifts>): Models.RShifts => {
  switch (action.type) {

    case ActionTypes.addShifts:
      return Object.assign({}, action.payload)

    default:
      return state
  }
}

export default shifts
