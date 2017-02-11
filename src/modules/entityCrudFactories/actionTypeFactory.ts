import { curry } from 'ramda'

import {
  checkForOverlappingKeys,
  actionTypeObjectFormatter,
  actionTypeStringFormatter
} from 'src/utils'

export const crudTypes = [
  'add',
  'removeAdd',
  'edit',
  'removeEdit',
  'delete',
  'removeDelete'
]

export interface CrudActionTypes {
  add: string
  removeAdd: string
  edit: string
  removeEdit: string
  delete: string
  removeDelete: string
}

type Partial<T> = {
  [P in keyof T]: T[P];
}

function generateCrudActionTypes(entityName: string) {
  const generateCrudTypeByName = actionTypeStringFormatter(entityName)
  return crudTypes.reduce((res, type) => (Object.assign({}, res, {
    [type]: generateCrudTypeByName(type)
  })), {})
}

// export const mergeWith = curry(function mergeCrudActionsWith<T>(entityName: string, otherActions: T): CrudActionTypes  {
//   const actionTypes = generateCrudActionTypes(entityName)
//   // format the inputted actions that arent the crud actions also
//   const formattedOtherActions = actionTypeObjectFormatter(entityName, otherActions)
//   checkForOverlappingKeys(actionTypes, formattedOtherActions)
//   return Object.assign({}, formattedOtherActions, actionTypes)
// })

export function mergeWith<T>(entityName: string, otherActions: T): CrudActionTypes & T {
  const actionTypes = generateCrudActionTypes(entityName)
  // format the inputted actions that arent the crud actions also
  const formattedOtherActions = actionTypeObjectFormatter(entityName, otherActions)
  checkForOverlappingKeys(actionTypes, formattedOtherActions)
  return Object.assign({}, formattedOtherActions, actionTypes)
}


// export const mergeWith = curry(mergeCrudActionsWith)
