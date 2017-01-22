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
export const getGeneralInspectLocationBreakdown = (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.locations
export const getGeneralInspectClientBreakdown = (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.clients


export const getInspectorGeneralData = (state: RState): GeneralInspector => {
  const shifts = getShifts(state)
  const currentTimeRange = getCurrentTimeRange(state)
  const initialResValue: GeneralInspector = {
    shifts: [],
    totalDuration: 0,
    breakdown: {
      employees: {}
    }
  }

  return shifts.reduce((res, shift) => {
    const startDate = cloneOrCreateMo(shift.startTime)

    if (currentTimeRange.contains(startDate)) {
      return {
        shifts: res.shifts.concat(shift),
        totalDuration: res.totalDuration + shift.duration,
        breakdown: {
          employees: nextEmployee(state, res, shift)
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

