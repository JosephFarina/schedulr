import * as M from 'moment'

import {
  Action,
  RShifts,
} from './../../models'
import { generateShifts } from './../../utils/test/generateShifts'
import { ActionTypes } from './../actionTypes'

export const initialState: RShifts = {
  shifts: generateShifts(M().format()),
  addedShifts: {},
  editedShifts: {},
  deletedShifts: [],
  shiftCacheIsValid: false,
  shiftCacheTimeRange: null
}

const shifts = (state = initialState, action: Action<RShifts>): RShifts => {
  switch (action.type) {

    case ActionTypes.addShifts:
      return Object.assign({}, action.payload)

    default:
      return state
  }
}

export default shifts
