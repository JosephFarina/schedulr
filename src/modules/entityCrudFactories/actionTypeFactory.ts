import { curry } from 'ramda'

import {
  checkForOverlappingKeys,
  actionTypeObjectFormatter,
  actionTypeStringFormatter
} from 'src/utils'

export declare type ActionOptions =
  'add' |
  'removeAdded' |
  'edit' |
  'removeEdited' |
  'delete' |
  'removeDeleted' |
  'setRaw'

export const crudTypes: ActionOptions[] = [
  'add',
  'removeAdded',
  'edit',
  'removeEdited',
  'delete',
  'removeDeleted',
  'setRaw'
]

export declare type CrudActionTypes = {
  [P in ActionOptions]: string
}

function generateCrudActionTypes(entityName: string) {
  const generateCrudTypeByName = actionTypeStringFormatter(entityName)
  return crudTypes.reduce((res, type) => (Object.assign({}, res, {
    [type]: generateCrudTypeByName(type)
  })), {})
}

export function mergeWith<T>(entityName: string, otherActions: T): CrudActionTypes & T {
  const actionTypes = generateCrudActionTypes(entityName)

  // format the inputted actions that arent the crud actions also
  const formattedOtherActions = actionTypeObjectFormatter(entityName, otherActions)
  checkForOverlappingKeys(actionTypes, formattedOtherActions)
  return Object.assign({}, formattedOtherActions, actionTypes)
}


