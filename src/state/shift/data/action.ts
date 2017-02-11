import { ShiftActions } from 'src/state/actionTypes'

import { Actions } from 'src/modules/entityCrudFactories'

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


export const addShifts = Actions.addEntity(ShiftActions.add, getAddedShifts)
export const removeAddedShifts = Actions.removeAddedEntity(ShiftActions.removeAdd, getAddedShifts)

/**
 * Add an edited shift / remove an edited shift
 */

export const editShifts = Actions.addEntity(ShiftActions.edit, getEditedShifts)
export const removeEditedShifts = Actions.removeAddedEntity(ShiftActions.removeEdit, getEditedShifts)

/**
 * Add a deleted shift / remove a deleted shift
 */

export const deleteShifts = Actions.deleteEntity(ShiftActions.delete, getDeletedShifts)
export const removeDeletedShifts = Actions.removeDeletedEntity(ShiftActions.removeDelete, getDeletedShifts)
