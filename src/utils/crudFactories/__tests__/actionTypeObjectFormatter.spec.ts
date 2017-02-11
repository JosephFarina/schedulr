import { actionTypeObjectFormatter, actionTypeStringFormatter } from 'src/utils'
import { values } from 'ramda'

describe('crud: actionTypeObjectGenerator', () => {
  const entityName = 'TEST'

  it('should map an object to actionTypeFormatter', () => {
    const obj = {
      'key': 'key',
      'nextKey': 'nextKey'
    }

    const formattedObj = actionTypeObjectFormatter(entityName, obj)
    expect(values(formattedObj).sort()).toEqual(values(obj).map(actionTypeStringFormatter(entityName)))
  })

  it('should map an array to actionTypeFormatter', () => {
    const arr = [
      'val',
      'secondVal'
    ]

    const formattedObj = actionTypeObjectFormatter(entityName, arr)
    expect(values(formattedObj).sort()).toEqual(arr.map(actionTypeStringFormatter(entityName)).sort())
  })

})
