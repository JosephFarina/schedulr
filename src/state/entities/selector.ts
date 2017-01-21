import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  RState,
  GeneralInspector,
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

export const getInspectorGeneralData = (state: RState): GeneralInspector => {
  const shifts = getShifts(state)
  const currentTimeRange = getCurrentTimeRange(state)

  const initialResValue: GeneralInspector = {
    shifts: [],
    totalDuration: 0,
    breakdown: {
      employees: []
    }
  }

  return shifts.reduce((res, shift) => {
    const startDate = cloneOrCreateMo(shift.startTime)

    if (currentTimeRange.contains(startDate)) {
      const nextShifts = res.shifts.concat(shift)
      const nextDur = res.totalDuration + shift.duration
      const nextEmployees = res.breakdown.employees

      return {
        shifts: nextShifts,
        totalDuration: nextDur,
        breakdown: {
          employees: nextEmployees
        }
      }
    }

    return res
  }, initialResValue)
}

export const getGeneralInspectorEmployeeBreakdown =
  (inspector: GeneralInspector): InspectorBreakdown<Employee>[] => inspector.breakdown.employees
