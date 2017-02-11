import { keys } from 'ramda'
import { mergeCrudActionsWith, crudTypes } from 'src/utils'

describe('crud: #mergeCrudActionsWith', () => {
  const entityName = 'SOMENAME'
  const otherActions = {
    'one': 'two',
    'three': 'four',
    'five': 'six'
  }
  const actions = mergeCrudActionsWith(entityName, otherActions)

  it('should still have other actions', () => {
    expect(keys(actions)).toEqual(jasmine.arrayContaining(keys(otherActions)))
  })

  it('should have every crud actions', () => {
    const actionKeys = keys(actions)

    crudTypes.forEach(type => {
      expect(~actionKeys.indexOf(type)).toBeTruthy()
    })
  })

})
