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


export const addShifts = addEntitiesActionFactory(ShiftActions.add, getAddedShifts)
export const removeAddedShifts = removeAddedEntitiesActionFactory(ShiftActions.removeAdd, getAddedShifts)

/**
 * Add an edited shift / remove an edited shift
 */

export const editShifts = addEntitiesActionFactory(ShiftActions.edit, getEditedShifts)
export const removeEditedShifts = removeAddedEntitiesActionFactory(ShiftActions.removeEdit, getEditedShifts)

/**
 * Add a deleted shift / remove a deleted shift
 */

export const deleteShifts = deleteEntitiesActionFactory(ShiftActions.delete, getDeletedShifts)
export const removeDeletedShifts = removeDeletedEntitiesActionFactory(ShiftActions.removeDelete, getDeletedShifts)
