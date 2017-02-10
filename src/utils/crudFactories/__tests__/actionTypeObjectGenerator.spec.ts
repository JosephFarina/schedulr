import { actionTypeObjectGenerator, actionTypeFormatter } from 'src/utils'
import { values, map, sort, compose } from 'ramda'


describe('crud: actionTypeObjectGenerator', () => {
  const entityName = 'TEST'

  it('should map an object to actionTypeFormatter', () => {
    const obj = {
      'key': 'key',
      'nextKey': 'nextKey'
    }

    const formattedObj = actionTypeObjectGenerator(entityName, obj)
    expect(values(formattedObj).sort()).toEqual(values(obj).map(actionTypeFormatter(entityName)))
  })

  it('should map an array to actionTypeFormatter', () => {
    const arr = [
      'val',
      'secondVal'
    ]

    const formattedObj = actionTypeObjectGenerator(entityName, arr)
    expect(values(formattedObj).sort()).toEqual(arr.map(actionTypeFormatter(entityName)).sort())
  })

})
