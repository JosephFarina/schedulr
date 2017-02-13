import { LocationEntityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedLocations,
  getDeletedLocations,
  getEditedLocations,
  getRawLocations
} from './'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

const actionFactory = Crud.Actions.actionFactory(LocationEntityActions)

const rawFactory = actionFactory(getRawLocations)
export const setLocations = rawFactory('setRaw')

const addFactory = actionFactory(getAddedLocations)
export const addLocations = addFactory('add')
export const removeAddedLocations = addFactory('removeAdded')

const editFactory = actionFactory(getEditedLocations)
export const editLocations = editFactory('edit')
export const removeEditedLocations = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedLocations)
export const deleteLocations = deleteFactory('delete')
export const removeDeletedLocations = deleteFactory('removeDeleted')
