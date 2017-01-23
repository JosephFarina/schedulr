import { Range } from 'moment'
import { compose } from 'redux'
import { createSelector } from 'reselect'
import {
  Client,
  Clients,
  Employee,
  Employees,
  GeneralInspector,
  InspectorBreakdown,
  Location,
  Locations,
  REntities,
  RState,
  Shift,
} from 'src/models'

import {
  cloneOrCreateMo
} from 'src/utils'

import { getCurrentTimeRange } from 'src/state/calendar'
import { getShifts } from 'src/state/shift'

export const getEntities = (state: RState): REntities => state.entities

export const getClients = (state: RState): Clients => getEntities(state).clients
export const getClientById = (state: RState, id: string): Client => getEntities(state).clients[id]
export const getClientsFromEntities = (entities: REntities): Clients => entities.clients
export const getClientFromEntitiesById = (entities: REntities, id: string): Client => entities.clients[id]

export const getEmployees = (state: RState): Employees => getEntities(state).employees
export const getEmployeeById = (state: RState, id: string): Employee => getEntities(state).employees[id]
export const getEmployeesFromEntities = (entities: REntities): Employees => entities.employees
export const getEmployeeFromEntitiesById = (entities: REntities, id: string): Employee => entities.employees[id]

export const getLocations = (state: RState): Locations => getEntities(state).locations
export const getLocationById = (state: RState, id: string): Location => getEntities(state).locations[id]
export const getLocationsFromEntities = (entities: REntities): Locations => entities.locations
export const getLocationFromEntitiesById = (entities: REntities, id: string): Location => entities.locations[id]

/**
 * 
 * Inspector Selectors
 * 
 */

export const getGeneralInspectorEmployeeBreakdown =
  (inspector: GeneralInspector): InspectorBreakdown<Employee> => inspector.breakdown.employees
export const getGeneralInspectorLocationBreakdown =
  (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.locations
export const getGeneralInspectorClientBreakdown =
  (inspect: GeneralInspector): InspectorBreakdown<Location> => inspect.breakdown.clients

export const getInspectorGeneralData = createSelector(
  getEntities,
  getShifts,
  getCurrentTimeRange,
  reduceInspectorGeneralData
)

function reduceInspectorGeneralData(entities: REntities, shifts: Shift[], currentTimeRange: Range): GeneralInspector {
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
      const breakdownFactory = entityGeneralInspectorBreakdownFactory(entities, res, shift)

      return {
        shifts: res.shifts.concat(shift),
        totalDuration: res.totalDuration + shift.duration,
        breakdown: {
          employees: breakdownFactory<Employee>('employee', getGeneralInspectorEmployeeBreakdown, getEmployeeFromEntitiesById),
          locations: breakdownFactory<Location>('location', getGeneralInspectorLocationBreakdown, getLocationFromEntitiesById),
          clients: breakdownFactory<Client>('client', getGeneralInspectorClientBreakdown, getClientFromEntitiesById),
        }
      }
    }

    return res
  }, initialResValue)
}

function entityGeneralInspectorBreakdownFactory(entities: REntities, inspector: GeneralInspector, currShift: Shift) {
  return <T>(
    entityType: 'location' | 'client' | 'employee',
    funcToGetBreakdown: (inspector: GeneralInspector) => InspectorBreakdown<T>,
    funcToGetEntityById: (state: RState, id: string) => T
  ): InspectorBreakdown<T> => {

    const currBreakdown = funcToGetBreakdown(inspector)
    const currEntityId = currShift[entityType]
    const currEntity = currBreakdown[currEntityId]


    return {
      ...currBreakdown,
      [currEntityId]: {
        entity: currEntity && currEntity.entity ? currEntity.entity : funcToGetEntityById(entities, currEntityId),
        shifts: currEntity && currEntity.shifts ? currEntity.shifts.concat(currShift) : [currShift],
        totalDuration: currEntity && currEntity.totalDuration >= 0 ?
          (currEntity.totalDuration + currShift.duration) : currShift.duration
      }
    }
  }
}
