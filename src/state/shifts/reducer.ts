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
      const newAddedShifts = Object.assign({}, state.addedShifts, action.payload)
      return Object.assign({}, state, { addedShifts: newAddedShifts })

    case ActionTypes.removeAddedShifts:
      const clonedAddedShifts = Object.assign({}, state.addedShifts)
      const idsToDelete: string[] = <string[]>action.payload
      idsToDelete.forEach(id => delete clonedAddedShifts[id])
      return Object.assign({}, state, { addedShifts: clonedAddedShifts })

    default:
      return state
  }
}

export default shifts
