const uniq = require('lodash.uniq')
import * as M from 'moment'
require('moment-range')

import {
  getGeneralInspectorEmployeeBreakdown,
  getGeneralInspectClientBreakdown,
  getGeneralInspectLocationBreakdown
  getInspectorGeneralData,
} from './../'

import {
  Client,
  Employee,
  GeneralInspector,
  InspectorBreakdown,
  Location,
  Shift,
  RState
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
      const uniqueEmployeesInCurrWeekShifts = getUniqueEntityFromCurrWeekShifts('employee')
      const uniqueLocationsInCurrWeekShifts = getUniqueEntityFromCurrWeekShifts('location')
      const uniqueClientInCurrWeekShifts = getUniqueEntityFromCurrWeekShifts('client')

      const employeeBreakdown = getGeneralInspectorEmployeeBreakdown(inspectorGeneralRes)
      const employeeBreakdownKeys = Object.keys(employeeBreakdown).sort()

      describe('employee', () => {

        it('should have an array for each employee in the shift', () => {
          expect(employeeBreakdownKeys).toEqual(uniqueEmployeesInCurrWeekShifts)
        })

        it('each employee should contain its own entity', () => {
          employeeBreakdownKeys.forEach(employeeId => {
            expect(employeeBreakdown[employeeId].entity).toEqual(employeesOne[employeeId])
          })
        })

        it('each employee should contain there shifts', () => {
          employeeBreakdownKeys.forEach(employeeId => {
            const currEmployeeShifts = employeeBreakdown[employeeId].shifts.sort(shiftSortFunc)
            const expectedShifts = getCurrWeekShiftsByEmployeeId(employeeId).sort(shiftSortFunc)
            expect(currEmployeeShifts).toEqual(expectedShifts)
          })
        })

        it('each employee should have there total shift summed', () => {
          employeeBreakdownKeys.forEach(employeeId => {
            const employee = employeeBreakdown[employeeId]
            const expectedTotalDuration = getCurrWeekShiftsByEmployeeId(employeeId)
              .reduce((total: number, shift) => total + shift.duration, 0)

            expect(employee.totalDuration).toEqual(expectedTotalDuration)
          })
        })

      })

    })

  })

})

function getCurrWeekShiftsByEmployeeId(employeeId: string): Shift[] {
  return Object.keys(currWeekShifts)
    .map(id => currWeekShifts[id])
    .filter(shift => shift.employee === employeeId)
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
