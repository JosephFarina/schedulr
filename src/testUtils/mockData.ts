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
  'c243243334': {
    id: 'c243243334',
    alias: 'asfahfjk fnA',
    locations: [
      '12123434'
    ]
  },
  'c444411kfadsf': {
    id: 'c444411kfadsf',
    alias: '1rq3eagfqafh',
    locations: ['12grrqwf']
  }
}

export const clientsOneArray: Employee[] = Object.keys(clientsOne).map(id => Object.assign({}, clientsOne[id]))

export const clientsTwo: Clients = {
  'c1234344311144': {
    id: 'c243243334',
    alias: 'casqaf kafadhfasf',
    locations: ['3qgefwg3rqwafs']
  },
  'c532141432434': {
    id: 'c444411kfadsf',
    alias: 'cavqekhafsdf d',
    locations: ['1rrqegwqacva']
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
  'a43qegrwger': {
    id: 'a43qegrwger',
    alias: '2 asdf23fevaf',
    firstName: '21qfdsf2  fa',
    lastName: 'asdf23fevaf'
  },
  '23rqwefdfw': {
    id: '23rqwefdfw',
    alias: 'av avdsfn23if09ef',
    firstName: 'avdsfkfaff',
    lastName: 'avdsfn23if09ef'
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

export const location: Location = <Location> {
  alias: 'fffavdak',
  id: 'asdf32wec',
  latitude: 0,
  longitude: 3
}

export const locationsOne: Locations = {
  '12123434': {
    alias: 'asdfvvas',
    id: '12123434'
  },
  '12grrqwf': {
    alias: 'asdvasdv',
    id: '12grrqwf'
  }
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

