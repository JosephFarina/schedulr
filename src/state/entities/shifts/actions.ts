import { ShiftEntityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedShifts,
  getEditedShifts,
  getDeletedShifts,
  getRawShifts
} from './'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

const actionFactory = Crud.Actions.actionFactory(ShiftEntityActions)

const rawFactory = actionFactory(getRawShifts)
export const setShifts = rawFactory('setRaw')

const addFactory = actionFactory(getAddedShifts)
export const addShifts = addFactory('add')
export const removeAddedShifts = addFactory('removeAdded')

const editFactory = actionFactory(getEditedShifts)
export const editShifts = editFactory('edit')
export const removeEditedShifts = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedShifts)
export const deleteShifts = deleteFactory('delete')
export const removeDeletedShifts = deleteFactory('removeDeleted')
