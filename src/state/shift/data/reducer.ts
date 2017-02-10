import * as M from 'moment'
const union = require('lodash.union')

import {
  Action,
  RShiftData,
} from 'src/models'
import { ShiftActions } from 'src/state/actionTypes'

import {
  generateShifts
} from 'src/testUtils'

import { deleteKeysFromObject } from 'src/utils'

export const initialState: RShiftData = {
  shifts: generateShifts(M().format()),
  addedShifts: {},
  editedShifts: {},
  deletedShifts: [],
  shiftCacheIsValid: false,
  shiftCacheTimeRange: null
}

const shiftData = (state = initialState, action: Action<RShiftData>): RShiftData => {
  switch (action.type) {

    // Add and remove added shifts
    case ShiftActions.add:
      return Object.assign({}, state, {
        addedShifts: Object.assign({}, state.addedShifts, action.payload)
      })

    case ShiftActions.removeAdd:
      return Object.assign({}, state, {
        addedShifts: action.payload
      })

    // Add and remove edited shifts
    case ShiftActions.edit:
      return Object.assign({}, state, {
        editedShifts: action.payload
      })

    case ShiftActions.removeEdit:
      return Object.assign({}, state, {
        editedShifts: action.payload
      })

    // Add and remove delete shifts
    case ShiftActions.delete:
      return Object.assign({}, state, {
        deletedShifts: action.payload
      })

    case ShiftActions.removeDelete:
      return Object.assign({}, state, {
        deletedShifts: action.payload
      })

    default:
      return state
  }
}

export default shiftData
