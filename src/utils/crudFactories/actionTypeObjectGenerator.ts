import { curry, map } from 'ramda'
import { actionTypeFormatter } from 'src/utils'

export const actionTypeObjectGenerator = curry(function actionTypeObjectGenerator(entityName: string, oldActionObj: any) {
  if (Array.isArray(oldActionObj)) {
    oldActionObj = oldActionObj.reduce((res, key) => (Object.assign({}, res, { [key]: key })), {})
  }

  return map((key: string) => actionTypeFormatter(entityName, key), oldActionObj)
})
