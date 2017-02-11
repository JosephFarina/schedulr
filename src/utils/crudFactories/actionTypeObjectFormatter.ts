import { curry, map } from 'ramda'
import { actionTypeStringFormatter } from 'src/utils'

/**
 * 
 * Takes in an array or object and formats each key
 * if it takes in an array it outputs an object where each key was the array value
 * and each value is a actionTypeStringFormatter value of the key
 * 
 */

export const actionTypeObjectFormatter = curry(function actionTypeObjectFormatter(entityName: string, oldActionObj: any) {
  if (Array.isArray(oldActionObj)) {
    oldActionObj = oldActionObj.reduce((res, key) => (Object.assign({}, res, { [key]: key })), {})
  }

  return map((key: string) => actionTypeStringFormatter(entityName, key), oldActionObj)
})
