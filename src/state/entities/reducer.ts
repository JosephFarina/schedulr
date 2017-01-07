import {
  Action,
  Client,
  Employee,
  Location,
  REntities
} from 'src/models'

import {
  clientsOne,
  employeesOne,
  locationsOne,
} from 'src/testUtils'

import { EntitiesActions } from 'src/state/actionTypes'

export const initialState: REntities = {
  clients: clientsOne,
  employees: employeesOne,
  locations: locationsOne
}

const entities = (state = initialState, action: Action<any>): REntities => {
  switch (action.type) {

    // resets clients with the payload
    case EntitiesActions.setClients:
      return Object.assign({}, state, {
        clients: action.payload
      })

    case EntitiesActions.addClient:
      const client: Client = action.payload
      return Object.assign({}, state, {
        clients: Object.assign({}, state.clients, { [client.id]: client })
      })

    // resets employees with the payload  
    case EntitiesActions.setEmployees:
      return Object.assign({}, state, {
        employees: action.payload
      })

    case EntitiesActions.addEmployee:
      const employee: Employee = action.payload
      return Object.assign({}, state, {
        employees: Object.assign({}, state.employees, { [employee.id]: employee })
      })

    // resets locations with the payload  
    case EntitiesActions.setLocations:
      return Object.assign({}, state, {
        locations: action.payload
      })

    case EntitiesActions.addLocation:
      const location: Location = action.payload
      return Object.assign({}, state, {
        locations: Object.assign({}, state.locations, { [location.id]: location })
      })


    default:
      return state
  }
}

export default entities
