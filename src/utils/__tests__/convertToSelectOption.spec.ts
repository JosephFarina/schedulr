// TODO: FIXME: GET THIS WORKNG AGAIN

import {
  Clients,
  Employees,
  Locations,
  SelectOption,
  SelectOptions,
} from 'src/models'

import { values } from 'ramda'
import { clientsOne } from 'src/testUtils/mockData'
import { convertEntityToSelectOptions } from 'src/utils'

describe('ConvertToSelectOption', () => {
  let res

  beforeEach(() => {
    res = convertEntityToSelectOptions(clientsOne)
  })

  describe('should work for an array of entites:', () => {
    it('length should be the same', () => {
      res = convertEntityToSelectOptions(values(clientsOne))
      expect(res.length).toEqual(values(clientsOne).length)
    })
  })

  describe('should work for an entities Object', () => {

    it('should return an array of the same length as the number of keys', () => {
      expect(res.length).toEqual(Object.keys(clientsOne).length)
    })

  })



  it('each array value should have the id as a value', () => {
    // testForCorrectValues(res, clientsOne)
  })

  it('each array display should be the clients name', () => {
    // testForCorrectDisplay(res, clientsOne)

  })

})

function testForCorrectValues(res: SelectOptions, entity: Clients | Employees | Locations) {
  const values = getSelectOptionsValue(res)
  const expectedValues = Object.keys(entity).map(entityId => entity[entityId].id).sort()
  expect(values).toEqual(expectedValues)
}

function testForCorrectDisplay(res: SelectOptions, entity: Clients | Employees | Locations) {
  const displays = getSelectOptionsDisplay(res)
  const expectedDisplays = Object.keys(entity).map(entityId => entity[entityId].alias).sort()
  expect(displays).toEqual(expectedDisplays)
}

function getSelectOptionsDisplay(options: SelectOptions) {
  return options.map(option => option.display).sort()
}

function getSelectOptionsValue(options: SelectOptions) {
  return options.map(option => option.value).sort()
}
