import {
  Clients,
  Employees,
  Locations,
  SelectOption,
  SelectOptions,
} from 'src/models'

import {
  client,
  clientsOne,
  clientsTwo,
  employee,
  employeesOne,
  employeesTwo,
  location,
  locationsOne,
  locationsTwo
} from 'src/testUtils/mockData'

import {
  convertEntityToSelectOptions
} from 'src/utils'

describe('ConvertToSelectOption', () => {

  describe('#convertClientsToSelectOptions', () => {
    let res: SelectOptions

    describe('clients', () => {
      beforeEach(() => {
        res = convertEntityToSelectOptions(clientsOne)
      })

      it('should return an array of the same lenght as the number of keys', () => {
        expect(res.length).toEqual(Object.keys(clientsOne).length)
      })

      it('each array value should have the id as a value', () => {
        testForCorrectValues(res, clientsOne)
      })

      it('each array display should be the clients name', () => {
        testForCorrectDisplay(res, clientsOne)
      })

    })

    describe('employees', () => {
      beforeEach(() => {
        res = convertEntityToSelectOptions(employeesOne)
      })

      it('should return an array of the same length as the number of keys', () => {
        expect(res.length).toEqual(Object.keys(employeesOne).length)
      })

      it('each array item should have the employees id as the value', () => {
        testForCorrectValues(res, employeesOne)
      })

      it('each array display should be the clients name', () => {
        testForCorrectDisplay(res, employeesOne)
      })

    })

    describe('locations', () => {
      beforeEach(() => {
        res = convertEntityToSelectOptions(locationsOne)
      })

      it('should return an array of the same length as the number of keys', () => {
        expect(res.length).toEqual(Object.keys(locationsOne).length)
      })

      it('each array item should have the employees id as the value', () => {
        testForCorrectValues(res, locationsOne)
      })

      it('each array display should be the clients name', () => {
        testForCorrectDisplay(res, locationsOne)
      })

    })

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
