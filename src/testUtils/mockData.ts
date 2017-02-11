import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  REntities
} from 'src/models'

/**
 * 
 * Default Client Values
 * 
 */

export const client: Client = {
  id: 'cgf3rga23',
  alias: '21rqwaf af',
  locations: ['rfee2', '2wff']
}

export const clientsOne: Clients = {
  'clientOne::1': {
    id: 'clientOne::1',
    alias: 'client one 1',
    locations: [
      '12123434'
    ]
  },
  'clientOne:2': {
    id: 'clientOne:2',
    alias: 'clientOne 2',
    locations: ['12grrqwf']
  }
}

export const clientsOneArray: Employee[] = Object.keys(clientsOne).map(id => Object.assign({}, clientsOne[id]))

export const clientsTwo: Clients = {
  'clientTwo:1': {
    id: 'clientTwo:1',
    alias: 'clientTwo 1',
    locations: ['3qgefwg3rqwafs']
  },
  'clientTwo:2': {
    id: 'clientTwo:2',
    alias: 'clientTwo 2',
    locations: ['1rrqelwqacva']
  }
}

export const clientsTwoArray: Employee[] = Object.keys(clientsTwo).map(id => Object.assign({}, clientsTwo[id]))

/**
 * 
 * Default Employee Values
 * 
 */

export const employee: Employee = {
  id: 'asdfdfdafs',
  alias: 'a asdfdsaf34fed',
  firstName: 'asfdf',
  lastName: 'asdfdsaf34fed'
}

export const employeesOne: Employees = {
  '0': {
    id: '0',
    alias: 'Employee 0',
    firstName: '0First',
    lastName: '0Last',
    manager: null
  },
  '1': {
    id: '1',
    alias: 'Employee 1',
    firstName: '1First',
    lastName: '1Last',
    manager: '0'
  },
  '2': {
    id: '2',
    alias: 'Employee 2',
    firstName: '2First',
    lastName: '2Last',
    manager: '1'
  },
  '3': {
    id: '3',
    alias: 'Employee 3',
    firstName: '3First',
    lastName: '3Last',
    manager: '1'
  },
  '4': {
    id: '4',
    alias: 'Employee 4',
    firstName: '4First',
    lastName: '4Last',
    manager: null
  }
}

export const employeesOneArray: Employee[] = Object.keys(employeesOne).map(id => Object.assign({}, employeesOne[id]))

export const employeesTwo: Employees = {
  'af3ijwekfas': {
    id: 'af3ijwekfas',
    alias: 'af fq3ewdfadsf',
    firstName: 'af3qwav',
    lastName: 'fq3ewdfadsf'
  }
}

export const employeesTwoArray: Employee[] = Object.keys(employeesTwo).map(id => Object.assign({}, employeesTwo[id]))

/**
 * 
 * Default Location Values
 * 
 */

export const location: Location = {
  alias: 'fffavdak',
  id: 'asdf32wec'
}

export const locationsOne: Locations = {
  'asdfsdf': {
    id: 'asdf'
  }
  // '12123434': {
  //   alias: 'asdfvvas',
  //   id: '12123434'
  // },
  // '12grrqwf': {
  //   alias: 'asdvasdv',
  //   id: '12grrqwf'
  // }
}

export const locationsOneArray: Location[] = Object.keys(locationsOne).map(id => Object.assign({}, locationsOne[id]))

export const locationsTwo: Locations = {
  '1rrqegwqacva': {
    alias: 'casdasdfdff',
    id: '1rrqegwqacva'
  },
  '3qgefwg3rqwafs': {
    alias: 'casdf',
    id: '3qgefwg3rqwafs'
  }
}

export const locationsTwoArray: Location[] = Object.keys(locationsTwo).map(id => Object.assign({}, locationsTwo[id]))

