import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  RState,
  GeneralInspector,
  Shift,
  InspectorBreakdown
} from 'src/models'

import {
  cloneOrCreateMo
} from 'src/utils'

import {
  getCurrentTimeRange,
  getMomentDate,
  getTimeRange,
} from 'src/state/calendar'


import { getShifts } from 'src/state/shift'

export const getClients = (state: RState): Clients => state.entities.clients
export const getClientById = (state: RState, id: string): Client => state.entities.clients[id]

export const getEmployees = (state: RState): Employees => state.entities.employees
export const getEmployeeById = (state: RState, id: string): Employee => state.entities.employees[id]

export const getLocations = (state: RState): Locations => state.entities.locations
export const getLocationById = (state: RState, id: string): Location => state.entities.locations[id]

/**
 * 
 * Inspector Selectors
 * 
 */

export const getGeneralInspectorEmployeeBreakdown =
  (inspector: GeneralInspector): InspectorBreakdown<Employee> => inspector.breakdown.employees
export const getGeneralInspectorLocationBreakdown = (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.locations
export const getGeneralInspectorClientBreakdown = (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.clients


export const getInspectorGeneralData = (state: RState): GeneralInspector => {
  const shifts = getShifts(state)
  const currentTimeRange = getCurrentTimeRange(state)
  const initialResValue: GeneralInspector = {
    shifts: [],
    totalDuration: 0,
    breakdown: {
      employees: {},
      locations: {},
      clients: {}
    }
  }

  return shifts.reduce((res, shift) => {
    const startDate = cloneOrCreateMo(shift.startTime)

    if (currentTimeRange.contains(startDate)) {
      return {
        shifts: res.shifts.concat(shift),
        totalDuration: res.totalDuration + shift.duration,
        breakdown: {
          employees: nextEmployee(state, res, shift),
          locations: nextLocation(state, res, shift),
          clients: nextClient(state, res, shift)
        }
      }
    }

    return res
  }, initialResValue)
}

function nextEmployee(state: RState, inspector: GeneralInspector, currShift: Shift): InspectorBreakdown<Employee> {
  const employeeBreakdown = getGeneralInspectorEmployeeBreakdown(inspector)
  const currEmployee = employeeBreakdown[currShift.employee]

  const entity = currEmployee && currEmployee.entity ? currEmployee.entity : getEmployeeById(state, currShift.employee)
  const shifts = currEmployee && currEmployee.shifts ? currEmployee.shifts.concat(currShift) : [currShift]
  const totalDuration = currEmployee && currEmployee.totalDuration >= 0 ?
    (currEmployee.totalDuration + currShift.duration) : currShift.duration

  return {
    ...employeeBreakdown,
    [currShift.employee]: {
      entity,
      shifts,
      totalDuration
    }
  }
}

function nextLocation(state: RState, inspector: GeneralInspector, currShift: Shift): InspectorBreakdown<Location> {
  const locationBreakdown = getGeneralInspectorLocationBreakdown(inspector)
  const currLocation = locationBreakdown[currShift.location]

  const entity = currLocation && currLocation.entity ? currLocation.entity : getLocationById(state, currShift.location)
  const shifts = currLocation && currLocation.shifts ? currLocation.shifts.concat(currShift) : [currShift]
  const totalDuration = currLocation && currLocation.totalDuration >= 0 ?
    (currLocation.totalDuration + currShift.duration) : currShift.duration

  return {
    ...locationBreakdown,
    [currShift.location]: {
      entity,
      shifts,
      totalDuration
    }
  }
}

function nextClient(state: RState, inspector: GeneralInspector, currShift: Shift): InspectorBreakdown<Location> {
  const clientBreakdown = getGeneralInspectorClientBreakdown(inspector)
  const currClient = clientBreakdown[currShift.client]

  const entity = currClient && currClient.entity ? currClient.entity : getClientById(state, currShift.client)

  const shifts = currClient && currClient.shifts ? currClient.shifts.concat(currShift) : [currShift]
  const totalDuration = currClient && currClient.totalDuration >= 0 ?
    (currClient.totalDuration + currShift.duration) : currShift.duration

  return {
    ...clientBreakdown,
    [currShift.client]: {
      entity,
      shifts,
      totalDuration
    }
  }
}
