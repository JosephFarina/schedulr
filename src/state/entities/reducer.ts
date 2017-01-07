import {
  Action,
  Client,
  Employee,
  Location,
  REntities
} from 'src/models'

import { ActionTypes } from 'src/state/actionTypes'

export const initialState: REntities = {
  clients: {},
  employees: {},
  locations: {}
}

const entities = (state = initialState, action: Action<any>): REntities => {
  switch (action.type) {

    // resets clients with the payload
    case ActionTypes.setClients:
      return Object.assign({}, state, {
        clients: action.payload
      })

    case ActionTypes.addClient:
      const client: Client = action.payload
      return Object.assign({}, state, {
        clients: Object.assign({}, state.clients, { [client.id]: client })
      })

    // resets employees with the payload  
    case ActionTypes.setEmployees:
      return Object.assign({}, state, {
        employees: action.payload
      })

    case ActionTypes.addEmployee:
      const employee: Employee = action.payload
      return Object.assign({}, state, {
        employees: Object.assign({}, state.employees, { [employee.id]: employee })
      })

    // resets locations with the payload  
    case ActionTypes.setLocations:
      return Object.assign({}, state, {
        locations: action.payload
      })

    case ActionTypes.addLocation:
      const location: Location = action.payload
      return Object.assign({}, state, {
        locations: Object.assign({}, state.locations, { [location.id]: location })
      })


    default:
      return state
  }
}

export default entities
