import {
  Clients,
  Employees,
  Locations,
  SelectOptions,
  SelectOption,
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
  clients
} from './../convertToSelectOption'

describe('ConvertToSelectOption', () => {

  describe('#clients', () => {

    it('should return an array of the same lenght as the number of keys', () => {
      const res = clients(clientsOne)
      expect(res.length).toEqual(Object.keys(clientsOne).length)
    })
    
    it('each array value should have ', () => {
    })
    
  })


})
