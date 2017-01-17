import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  RState,
} from 'src/models'

export const getClients = (state: RState): Clients => state.entities.clients
export const getClientById = (state: RState, id: string): Client => state.entities.clients[id]

export const getEmployees = (state: RState): Employees => state.entities.employees
export const getEmployeeById = (state: RState, id: string): Employee => state.entities.employees[id]

export const getLocations = (state: RState): Locations => state.entities.locations
export const getLocationById = (state: RState, id: string): Location => state.entities.locations[id]
