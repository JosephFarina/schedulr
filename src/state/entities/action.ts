import {
  Action,
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  REntities
} from 'src/models'

import { EntitiesActions } from 'src/state/actionTypes'

/**
 * 
 * Client Actions
 * 
 */

export function setClients(clients: Clients): Action<Clients> {
  return {
    type: EntitiesActions.setClients,
    payload: clients
  }
}

export function addClient(client: Client): Action<Client> {
  return {
    type: EntitiesActions.addClient,
    payload: client
  }
}

/**
 * 
 * Employee Actions
 * 
 */

export function setEmployees(employees: Employees): Action<Employees> {
  return {
    type: EntitiesActions.setEmployees,
    payload: employees
  }
}

export function addEmployee(employee: Employee): Action<Employee> {
  return {
    type: EntitiesActions.addEmployee,
    payload: employee
  }
}

/**
 * 
 * Location Actions 
 * 
 */

export function setLocations(locations: Locations): Action<Locations> {
  return {
    type: EntitiesActions.setLocations,
    payload: locations
  }
}

export function addLocation(location: Location): Action<Location> {
  return {
    type: EntitiesActions.addLocation,
    payload: location
  }
}
