const uniq = require('lodash.uniq')
import * as M from 'moment'
require('moment-range')

import {
  getGeneralInspectorEmployeeBreakdown,
  getGeneralInspectorClientBreakdown,
  getGeneralInspectorLocationBreakdown,
  getInspectorGeneralData,
} from './../'

import {
  Client,
  Employee,
  GeneralInspector,
  InspectorBreakdown,
  Location,
  Shift,
  RState,
  Locations,
  Clients,
  Employees
} from 'src/models'

import {
  getCurrentTimeRange,
  getMomentDate,
  getTimeRange,
} from 'src/state/calendar'
import { getShifts } from 'src/state/shift'

import {
  clientsOne,
  employeesOne,
  generateShifts,
  locationsOne,
} from 'src/testUtils'
import { convertShiftObjectToArray } from 'src/utils'

const currWeekShifts = generateShifts(M())
const prevWeekShifts = generateShifts(M().subtract(1, 'week'))
const nextWeekShifts = generateShifts(M().add(1, 'week'))

const state: RState = {
  entities: {
    clients: clientsOne,
    employees: employeesOne,
    locations: locationsOne
  },
  shift: {
    data: {
      addedShifts: {},
      deletedShifts: [],
      editedShifts: {},
      shifts: Object.assign({}, prevWeekShifts, currWeekShifts, nextWeekShifts)
    }
  },
  calendar: {
    date: M().format(),
    timeRange: 'week'
  }
}

const currMomentRange = getCurrentTimeRange(state)
const currTimeRange = getTimeRange(state)
const currDate = getMomentDate(state)
const inspectorGeneralRes = getInspectorGeneralData(state)
const shiftsInCurrWeek = convertShiftObjectToArray(currWeekShifts)

describe('Entities Selector', () => {

  describe('#getInspectorGeneralData', () => {

    beforeEach(() => {

    })

    it('should get only the shifts in the current range', () => {
      expect(inspectorGeneralRes.shifts.length).toEqual(shiftsInCurrWeek.length)
      inspectorGeneralRes.shifts.forEach(shift => {
        expect(currMomentRange.contains(M(shift.startTime))).toBeTruthy()
      })
    })

    it('should get the total number of hours for the shift in the current range', () => {
      const expectedCumulativeDuration = shiftsInCurrWeek.reduce((dur, shift) => {
        return dur + shift.duration
      }, 0)
      expect(inspectorGeneralRes.totalDuration).toEqual(expectedCumulativeDuration)
    })

    describe('Breakdown:', () => {
      const employeeBreakdown = getGeneralInspectorEmployeeBreakdown(inspectorGeneralRes)
      const locationBreakdown = getGeneralInspectorLocationBreakdown(inspectorGeneralRes)
      const clientBreakdown = getGeneralInspectorClientBreakdown(inspectorGeneralRes)

      /**
       * 
       * Breakdown functions
       * 
       */

      function shouldHaveCorrectNumOfKeys(
        entity: 'client' | 'location' | 'employee',
        breakdown: InspectorBreakdown<Location | Employee | Client>,
        shiftsBeingTested: Shift[]
      ) {
        it(`should have keys for each ${entity} in the shift`, () => {
          const unique = uniq(shiftsBeingTested.map(shift => shift[entity])).sort()
          expect(Object.keys(breakdown).sort()).toEqual(unique)
        })
      }

      function shouldContainItsOwnEntity(
        entity: 'client' | 'location' | 'employee',
        breakdown: InspectorBreakdown<Location | Employee | Client>,
        entityDataSource: Locations | Clients | Employees,
      ) {
        it(`each ${entity} should contain its own entity`, () => {
          Object.keys(breakdown).forEach(id => {
            const expectedEntityFromDataSource = entityDataSource[id]
            const entityFromBreakdown = breakdown[id].entity
            expect(entityFromBreakdown).toEqual(expectedEntityFromDataSource)
          })
        })
      }

      function shouldContainItsOwnShifts(
        entity: 'client' | 'location' | 'employee',
        breakdown: InspectorBreakdown<Location | Employee | Client>,
        funcToGetEntityShifts: (id: string) => Shift[]
      ) {
        it(`each ${entity} should contain their shifts`, () => {
          Object.keys(breakdown).forEach(id => {
            const shiftsFromBreakdown = breakdown[id].shifts.sort(shiftSortFunc)
            const expectedShifts = funcToGetEntityShifts(id).sort(shiftSortFunc)
            expect(shiftsFromBreakdown).toEqual(expectedShifts)
          })
        })
      }

      function shouldHaveCorrectShiftDurationTotal(
        entity: 'client' | 'location' | 'employee',
        breakdown: InspectorBreakdown<Location | Employee | Client>,
        funcToGetEntityShifts: (id: string) => Shift[]
      ) {
        it(`each ${entity} should have there total shift summed`, () => {
          Object.keys(breakdown).forEach(id => {
            const currBreakdown = breakdown[id]
            const expectedTotalDuration = funcToGetEntityShifts(id).reduce((total: number, shift) => total + shift.duration, 0)
            expect(currBreakdown.totalDuration).toEqual(expectedTotalDuration)
          })
        })
      }

      describe('Employees:', () => {
        shouldHaveCorrectNumOfKeys('employee', employeeBreakdown, shiftsInCurrWeek)
        shouldContainItsOwnEntity('employee', employeeBreakdown, employeesOne)
        shouldContainItsOwnShifts('employee', employeeBreakdown, getCurrWeekShiftsByEmployeeId)
        shouldHaveCorrectShiftDurationTotal('employee', employeeBreakdown, getCurrWeekShiftsByEmployeeId)
      })

      describe('Locations:', () => {
        shouldHaveCorrectNumOfKeys('location', locationBreakdown, shiftsInCurrWeek)
        shouldContainItsOwnEntity('location', locationBreakdown, locationsOne)
        shouldContainItsOwnShifts('location', locationBreakdown, getCurrWeekShiftsByLocationId)
        shouldHaveCorrectShiftDurationTotal('location', locationBreakdown, getCurrWeekShiftsByLocationId)
      })

      describe('Clients:', () => {
        shouldHaveCorrectNumOfKeys('client', clientBreakdown, shiftsInCurrWeek)
        shouldContainItsOwnEntity('client', clientBreakdown, clientsOne)
        shouldContainItsOwnShifts('client', clientBreakdown, getCurrWeekShiftsByClientId)
        shouldHaveCorrectShiftDurationTotal('client', clientBreakdown, getCurrWeekShiftsByClientId)
      })

    })

  })

})

function getCurrWeekShiftsByEmployeeId(id: string): Shift[] {
  return getCurrWeekShiftsByEntityId('employee')(id)
}

function getCurrWeekShiftsByLocationId(id: string): Shift[] {
  return getCurrWeekShiftsByEntityId('location')(id)
}

function getCurrWeekShiftsByClientId(id: string): Shift[] {
  return getCurrWeekShiftsByEntityId('client')(id)
}

function getCurrWeekShiftsByEntityId(entity: 'client' | 'location' | 'employee') {
  return (id: string): Shift[] => {
    return Object.keys(currWeekShifts)
      .map(id => currWeekShifts[id])
      .filter(shift => shift[entity] === id)
  }
}





function getUniqueEntityFromCurrWeekShifts(entity: 'client' | 'location' | 'employee'): string[] {
  return uniq(shiftsInCurrWeek.map(shift => shift[entity])).sort()
}

function shiftSortFunc(a: any, b: any) {
  if (a.id === b.id) {
    return 0
  } else if (a.id < b.id) {
    return 1
  } else {
    return -1
  }
}
