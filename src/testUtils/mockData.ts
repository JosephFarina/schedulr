import {
  Clients,
  Client,
  Employees,
  Locations,
  Positions,
  UnnormalizedShift,
  EmployeeFavorabilies,
  Entities
} from 'src/models'

import { identity, times, compose, length, keys } from 'ramda'

/**
 * 
 * Default Client Values
 * 
 */

export const CLIENTS: Entities<Clients> = {
  'clientOne:1': {
    id: 'clientOne:1',
    alias: 'client one 1',
    locations: [
      'locationsOne:1'
    ]
  },
  'clientOne:2': {
    id: 'clientOne:2',
    alias: 'clientOne 2',
    locations: ['locationsOne:2']
  }
}

export const CLIENTS_TWO: Entities<Clients> = {
  'clientTwo:1': {
    id: 'clientTwo:1',
    alias: 'clientTwo 1',
    locations: ['locationsTwo:1']
  },
  'clientTwo:2': {
    id: 'clientTwo:2',
    alias: 'clientTwo 2',
    locations: ['locationsTwo:2']
  }
}

/**
 * 
 * Default Location Values
 * 
 */

export const LOCATIONS: Entities<Locations> = {
  'locationsOne:1': {
    id: 'locationsOne:1',
    alias: 'locationOne 1'
  },
  'locationsOne:2': {
    alias: 'locationsOne 2',
    id: 'locationsOne:2'
  },
  'locationsOne:3': {
    alias: 'locationsOne 3',
    id: 'locationsOne:3'
  }
}

export const LOCATIONS_TWO: Entities<Locations> = {
  'locationsTwo:1': {
    alias: 'locationsTwo 1',
    id: 'locationsTwo:1'
  },
  'locationsTwo:2': {
    alias: 'locationsTwo 2',
    id: 'locationsTwo:2'
  }
}

/**
 * 
 * Positions Value
 * 
 */

export const POSITIONS: Entities<Positions> = {
  '0': {
    id: '0',
    alias: 'Manager'
  },
  '1': {
    id: '1',
    alias: 'Crew Member'
  },
  '2': {
    id: '2',
    alias: 'Supervisor'
  }
}

export const POSITIONS_TWO: Entities<Positions> = {
  '3': {
    id: '3',
    alias: 'Project Manager'
  }
}


/**
 * 
 * Default Employee Values
 * 
 */

export const EMPLOYEES: Entities<Employees> = {
  '0': {
    id: '0',
    alias: 'Joey Farina',
    firstName: 'joseph',
    lastName: 'farina',
    position: '0',
    manager: null
  },
  '1': {
    id: '1',
    alias: 'Shaya Alarfaj',
    firstName: 'bashayer',
    lastName: 'alarfaj',
    position: '1',
    manager: '0'
  },
  '2': {
    id: '2',
    alias: 'Benito',
    firstName: 'lenny',
    lastName: 'cat',
    position: '1',
    manager: '1'
  },
  '3': {
    id: '3',
    alias: 'Sasha',
    firstName: 'sasha',
    lastName: 'cat',
    position: '1',
    manager: '1'
  },
  '4': {
    id: '4',
    alias: 'Bobby H.',
    firstName: 'bob',
    lastName: 'herrington',
    position: '2',
    manager: null
  }
}

export const EMPLOYEES_TWO: Entities<Employees> = {
  'af3ijwekfas': {
    id: 'af3ijwekfas',
    alias: 'af fq3ewdfadsf',
    firstName: 'af3qwav',
    position: '3',
    lastName: 'fq3ewdfadsf'
  }
}



export function generateEmployeeFavorability(): EmployeeFavorabilies {
  return Object.keys(CLIENTS).reduce((clientsRes, clientKey, clientIndex) => {

    const employeesRes = Object.keys(EMPLOYEES).reduce((empRes, employeeKey, employeeIndex) => {
      return Object.assign({}, empRes, {
        ['' + clientIndex + employeeIndex]: {
          id: '' + clientIndex + employeeIndex,
          alias: '' + clientIndex + employeeIndex,
          client: clientKey,
          rating: 3,
          canWorkWith: Math.random() > .5,
          employee: employeeKey,
          isDefaultRating: false
        }
      })
    }, {})

    return { ...clientsRes, ...employeesRes }
  }, {})
}


/**
 * 
 * Generate Shifts
 * 
 */

import * as M from 'moment'

export function getUnnormalizedShifts(employeeId: string): UnnormalizedShift[] {
  return times(index => {
    const randomClientKeyIndex = compose(
      x => Math.floor(Math.random() * x),
      length,
      keys
    )(CLIENTS)
    const clientId = '' + keys(CLIENTS)[randomClientKeyIndex]
    const client: Client = Object.assign({}, CLIENTS)[clientId]
    const location = LOCATIONS[client.locations[0]]
    const employee = Object.assign({}, EMPLOYEES[employeeId])

    return {
      id: '' + index,
      startTime: M().add(index, 'day').hour(9).minute(0).format(),
      duration: 60 * 8,
      client,
      location,
      employee
    }
  }, 15)
}
