import {
  Clients,
  Employees,
  Locations,
  RState
} from 'src/models'

export const getClients = (state: RState): Clients => state.entities.clients
export const getEmployees = (state: RState): Employees => state.entities.employees
export const getLocations = (state: RState): Locations => state.entities.locations


