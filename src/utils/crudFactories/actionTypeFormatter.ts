import { curry } from 'ramda'

/**
 * 
 * Generates an action type with context
 * 
 */

export const actionTypeFormatter = curry(function actionTypeFormatter(entityName: string, type: string) {
  return entityName + '::' + type.replace(/ /g, '_')
})
