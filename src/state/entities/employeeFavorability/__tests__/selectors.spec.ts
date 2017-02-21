import { CLIENTS, generateEmployeeFavorability, EMPLOYEES } from 'src/testUtils'
import { RState } from 'src/models'

import {
  getEmployeeFavorabilitiesByEmployeeId,
  getEmployeeFavorabilitiesByClientId
} from './../'

const state: RState = {
  entities: {
    employeeFavorability: {
      raw: generateEmployeeFavorability(),
      added: {},
      deleted: [],
      edited: {}
    },
    clients: {
      added: {},
      deleted: [],
      edited: {},
      raw: { ...CLIENTS }
    },
    employees: {
      crud: {
        added: {},
        deleted: [],
        edited: {},
        raw: { ...EMPLOYEES }
      }
    }
  }
}


describe('EmployeeFavorability:selector', () => {

  it('#getEmployeeFavorabilitiesByEmployeeId should return all values for the employee', () => {
    const testEmployeeId = Object.keys(EMPLOYEES)[0]
    const res = getEmployeeFavorabilitiesByEmployeeId(state, testEmployeeId)
    expect(res.length).toEqual(Object.keys(CLIENTS).length)
    res.forEach(empFav => {
      expect(empFav.employee.id).toEqual(testEmployeeId)
    })
  })

  it('#getEmployeeFavorabilitiesByClientId should retunr all values for the client', () => {
    const testClientId = Object.keys(CLIENTS)[0]
    const res = getEmployeeFavorabilitiesByClientId(state, testClientId)
    expect(res.length).toEqual(Object.keys(EMPLOYEES).length)
    res.forEach(empFav => {
      expect(empFav.client.id).toEqual(testClientId)
    })
  })

})

