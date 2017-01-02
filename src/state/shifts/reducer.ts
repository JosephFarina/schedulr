import * as M from 'moment'

import {
  Action,
  RShifts,
} from './../../models'
import { deleteKeysFromObject } from './../../utils/deleteKeysFromObject'
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
      const newAddedShifts = Object.assign({}, state.addedShifts, action.payload)
      return Object.assign({}, state, { addedShifts: newAddedShifts })

    case ActionTypes.removeAddedShifts:
      return Object.assign({}, state, {
        addedShifts: deleteKeysFromObject(<string[]>action.payload, state.addedShifts)
      })

    default:
      return state
  }
}

export default shifts
