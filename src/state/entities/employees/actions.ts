import { Action, employeeViewOptions } from 'src/models'
import { EmployeeEntityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedEmployees,
  getDeletedEmployees,
  getEditedEmployees,
  getRawEmployees
} from './'

export function searchForEmployee(val: string): Action<string> {
  return {
    type: EmployeeEntityActions.search,
    payload: val
  }
}

export function changeEmployeeView(val: employeeViewOptions): Action<employeeViewOptions> {
  return {
    type: EmployeeEntityActions.changeView,
    payload: val
  }
}


/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

const actionFactory = Crud.Actions.actionFactory(EmployeeEntityActions)

const rawFactory = actionFactory(getRawEmployees)
export const setEmployees = rawFactory('setRaw')

const addFactory = actionFactory(getAddedEmployees)
export const addEmployees = addFactory('add')
export const removeAddedEmployees = addFactory('removeAdded')

const editFactory = actionFactory(getEditedEmployees)
export const editEmployees = editFactory('edit')
export const removeEditedEmployees = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedEmployees)
export const deleteEmployees = deleteFactory('delete')
export const removeDeletedEmployees = deleteFactory('removeDeleted')
