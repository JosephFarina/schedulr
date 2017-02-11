import { curry, map } from 'ramda'


/**
 * 
 * Generates an action type with context
 * 
 */


export const actionTypeStringFormatter = curry(function actionTypeFormatter(entityName: string, type: string) {
  return entityName + '::' + type.replace(/ /g, '_')
})


/**
 * 
 * Maps over an objects values or an array and returns 
 * a new object with properlly formatted action types
 * 
 */


export const actionTypeObjectFormatter = curry(function actionTypeObjectFormatter<T>(entityName: string, oldActionObj: any): T {
  if (Array.isArray(oldActionObj)) {
    oldActionObj = oldActionObj.reduce((res, key) => (Object.assign({}, res, { [key]: key })), {})
  }

  return <any> map((val: string) => actionTypeStringFormatter(entityName, val), oldActionObj)
})
