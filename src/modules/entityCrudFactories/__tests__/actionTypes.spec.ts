import { keys } from 'ramda'
import * as CRUD from 'src/modules/entityCrudFactories'

describe('entityCrudFactories: actionTypes', () => {
  const entityName = 'SOMENAME'
  const otherActions = {
    'one': 'two',
    'three': 'four',
    'five': 'six'
  }

  const actions = CRUD.ActionTypes.mergeWith(entityName, otherActions)


  it('should still have other actions', () => {
    expect(keys(actions)).toEqual(jasmine.arrayContaining(keys(otherActions)))
  })

  it('should have every crud actions', () => {
    const actionKeys = keys(actions)

    CRUD.ActionTypes.crudTypes.forEach(type => {
      expect(~actionKeys.indexOf(type)).toBeTruthy()
    })
  })
})

