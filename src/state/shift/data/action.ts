import { ShiftActions } from 'src/state/actionTypes'

import {
  removeDeletedEntitiesActionFactory,
  removeAddedEntitiesActionFactory,
  deleteEntitiesActionFactory,
  addEntitiesActionFactory
} from 'src/utils'

import {
  getAddedShifts,
  getEditedShifts,
  getDeletedShifts
} from './selector'


/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */


export const addShifts = addEntitiesActionFactory(ShiftActions.addShifts)
export const removeAddedShifts = removeAddedEntitiesActionFactory(ShiftActions.removeAddedShifts, getAddedShifts)

/**
 * Add an edited shift / remove an edited shift
 */

export const editShifts = addEntitiesActionFactory(ShiftActions.editShifts)
export const removeEditedShifts = removeAddedEntitiesActionFactory(ShiftActions.removeEditedShifts, getEditedShifts)

/**
 * Add a deleted shift / remove a deleted shift
 */

export const deleteShifts = deleteEntitiesActionFactory(ShiftActions.deleteShifts, getDeletedShifts)
export const removeDeletedShifts = removeDeletedEntitiesActionFactory(ShiftActions.removeDeletedShifts, getDeletedShifts)
