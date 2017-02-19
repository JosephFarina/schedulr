import {
  Clients,
  Employees,
  Locations,
  Position,
  Positions
} from 'src/models'

/**
 * 
 * Default Client Values
 * 
 */

export const clientsOne: Clients = {
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

export const clientsTwo: Clients = {
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
 * Default Employee Values
 * 
 */

export const employeesOne: Employees = {
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

export const employeesTwo: Employees = {
  'af3ijwekfas': {
    id: 'af3ijwekfas',
    alias: 'af fq3ewdfadsf',
    firstName: 'af3qwav',
    position: '3',
    lastName: 'fq3ewdfadsf'
  }
}

/**
 * 
 * Default Location Values
 * 
 */

export const locationsOne: Locations = {
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

export const locationsTwo: Locations = {
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

export const positionsOne: Positions = {
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

export const positionsTwo: Positions = {
  '3': {
    id: '3',
    alias: 'Project Manager'
  }
}
