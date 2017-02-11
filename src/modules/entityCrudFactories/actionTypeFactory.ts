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

function generateCrudActionTypes(entityName: string) {
  const generateCrudTypeByName = actionTypeStringFormatter(entityName)
  return crudTypes.reduce((res, type) => (Object.assign({}, res, {
    [type]: generateCrudTypeByName(type)
  })), {})
}

export const mergeWith = curry(function mergeCrudActionsWith(entityName: string, otherActions: any) {
  const actionTypes = generateCrudActionTypes(entityName)
  // format the inputted actions that arent the crud actions also
  const formattedOtherActions = actionTypeObjectFormatter(entityName, otherActions)
  checkForOverlappingKeys(actionTypes, formattedOtherActions)
  return Object.assign({}, formattedOtherActions, actionTypes)
})
