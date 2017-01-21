const uniq = require('lodash.uniq')
import * as M from 'moment'
require('moment-range')

import {
  getGeneralInspectorEmployeeBreakdown,
  getInspectorGeneralData,
} from './../'

import {
  Client,
  Employee,
  GeneralInspector,
  InspectorBreakdown,
  Location,
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

    describe('breakdown', () => {
      const uniqueEmployees = uniq(shiftsInCurrWeek.map(shift => shift.employee))
      const employeeBreakdown = getGeneralInspectorEmployeeBreakdown(inspectorGeneralRes)

      describe('employee', () => {
        // TODO: make this pass
        it('should have an array for each employee in the shift', () => {
          expect(Array.isArray(employeeBreakdown)).toBeTruthy()
          expect(employeeBreakdown.length).toEqual(uniqueEmployees.length)
        })

        it('each employee should contain its own entity', () => {
          // inspectorGeneralRes.breakdown.employees.forEach(employee => {

          //   employee.entity
          // })
        })

      })

    })

  })

})
