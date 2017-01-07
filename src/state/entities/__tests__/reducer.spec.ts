import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  REntities
} from 'src/models'

import {
  addClient,
  addEmployee,
  addLocation,
  setClients,
  setEmployees,
  setLocations,
} from './../action'
import entities from './../reducer'

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
} from 'src/utils/test/mockData'

describe('Entities Reducer', () => {

  describe('Client', () => {
    const initialState: REntities = {
      clients: clientsOne
    }

    it('#setClients should replace values', () => {
      const state = entities(initialState, setClients(clientsTwo))
      expect(state.clients).toEqual(clientsTwo)
    })

    it('#addClient should add a client', () => {
      const state = entities(initialState, addClient(client))
      expect(state.clients).toEqual(jasmine.objectContaining(clientsOne))
      expect(state.clients[client.id]).toEqual(client)
    })

  })

  describe('Employee', () => {
    const initialState: REntities = {
      employees: employeesOne
    }

    it('#setEmployees should replace values', () => {
      const state = entities(initialState, setEmployees(employeesTwo))
      expect(state.employees).toEqual(employeesTwo)
    })

    it('#addEmployee should add an employee', () => {
      const state = entities(initialState, addEmployee(employee))
      expect(state.employees).toEqual(jasmine.objectContaining(employeesOne))
      expect(state.employees[employee.id]).toEqual(employee)
    })

  })

  describe('Location', () => {
    const initialState: REntities = {
      locations: locationsOne
    }

    it('#setLocations should replace values', () => {
      const state = entities(initialState, setLocations(locationsTwo))
      expect(state.locations).toEqual(locationsTwo)
    })

    it('#addLocation should add a location', () => {
      const state = entities(initialState, addLocation(location))
      expect(state.locations).toEqual(jasmine.objectContaining(locationsOne))
      expect(state.locations[location.id]).toEqual(location)
    })

  })

})
