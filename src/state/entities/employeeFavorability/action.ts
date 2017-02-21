import { EmployeeFavorabilityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedEmployeeFavorabilies,
  getDeletedEmployeeFavorabilies,
  getEditedEmployeeFavorabilies,
  getRawEmployeeFavorabilies
} from './'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

const actionFactory = Crud.Actions.actionFactory(EmployeeFavorabilityActions)

const rawFactory = actionFactory(getRawEmployeeFavorabilies)
export const setEmployeeFavorabilities = rawFactory('setRaw')

const addFactory = actionFactory(getAddedEmployeeFavorabilies)
export const addEmployeeFavorabilities = addFactory('add')
export const removeAddedEmployeeFavorabilities = addFactory('removeAdded')

const editFactory = actionFactory(getEditedEmployeeFavorabilies)
export const editEmployeeFavorabilities = editFactory('edit')
export const removeEditedEmployeeFavorabilities = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedEmployeeFavorabilies)
export const deleteEmployeeFavorabilities = deleteFactory('delete')
export const removeDeletedEmployeeFavorabilities = deleteFactory('removeDeleted')
