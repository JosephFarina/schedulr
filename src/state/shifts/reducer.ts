/**
 * 
 * TODO:
 * Split up shifts reducer
 *  shifts: {
 *    data: <current shift reducer>,
 *    editor: <new reducer>
 *  }
 * 
 */

import * as M from 'moment'
const union = require('lodash.union')

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

    // Add and remove added shifts
    case ActionTypes.addShifts:
      const newAddedShifts = Object.assign({}, state.addedShifts, action.payload)
      return Object.assign({}, state, { addedShifts: newAddedShifts })

    case ActionTypes.removeAddedShifts:
      return Object.assign({}, state, {
        addedShifts: deleteKeysFromObject(<string[]> action.payload, state.addedShifts)
      })

    // Add and remove edited shifts
    case ActionTypes.editShifts:
      const newEditedShifts = Object.assign({}, state.editedShifts, action.payload)
      return Object.assign({}, state, {
        editedShifts: newEditedShifts
      })

    case ActionTypes.removeEditedShifts:
      return Object.assign({}, state, {
        editedShifts: deleteKeysFromObject(<string[]> action.payload, state.editedShifts)
      })

    // Add and remove delete shifts
    case ActionTypes.deleteShifts:
      return Object.assign({}, state, {
        deletedShifts: union(action.payload, state.deletedShifts)
      })

    case ActionTypes.removeDeletedShifts:
      const payload: string[] = <string[]> action.payload
      const newDeletedShifts = state.deletedShifts.filter(shiftId => {
        return payload.indexOf(shiftId) < 0
      })

      return Object.assign({}, state, {
        deletedShifts: newDeletedShifts
      })

    default:
      return state
  }
}

export default shifts
