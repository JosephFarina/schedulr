import * as M from 'moment'

import {
  RShiftEditor,
  RState,
  ShiftTemplate,
} from 'src/models'

import {
  getEmployeesInShiftBeingCreated,
  getGeneratedShifts,
  getShiftBeingCreated,
  getShiftDate
} from './../selector'

const date = M().add(2, 'days').hour(12).minute(0).second(0).format()
const startTime = M().hour(4).minute(30).second(0).format()
const duration = 960
const client = 'CLIENT NAME'
const location = 'LOCATION NAME'

const state: RState = {
  shift: {
    editor: {
      newShift: {
        startTime,
        duration,
        client,
        location
      },
      shiftDate: date,
      employeesInShift: [
        'fakeid1',
        'fakeid2',
        'fakeid3'
      ],
    }
  }
}

describe('ShiftEditor Selector', () => {

  it('should return an array of the same length as the number of employees in the shift', () => {
    const shifts = getGeneratedShifts(state)
    const employeesInShift = getEmployeesInShiftBeingCreated(state)
    expect(shifts.length).toEqual(employeesInShift.length)
  })

  it('should return a single shift if there are no employees and employee should be null', () => {
    const shiftWithNoEmployees = cloneState()
    shiftWithNoEmployees.shift.editor.employeesInShift = []
    const shifts = getGeneratedShifts(shiftWithNoEmployees)
    expect(shifts.length).toEqual(1)
    expect(shifts[0].employee).toBeNull()
  })

  it('each shift date should have the correct startTime', () => {
    const shifts = getGeneratedShifts(state)
    shifts.forEach(shift => {
      expect(shift.startTime).toEqual(expectedStartTime())
    })
  })

  it('each shift should have the employee', () => {
    const employeesInShifts = getGeneratedShifts(state).map(shift => shift.employee)
    const employees = getEmployeesInShiftBeingCreated(state)
    employees.forEach(employeeId => {
      expect(employeesInShifts.indexOf(employeeId)).toBeGreaterThanOrEqual(0)
    })
  })

  it('each shift should have the correct id, duration, location, and client', () => {
    getGeneratedShifts(state).forEach(shift => {
      expect(shift.client).toEqual(client)
      expect(shift.duration).toEqual(duration)
      expect(shift.location).toEqual(location)
      expect(shift.id).toBeTruthy()
    })
  })

})

function expectedStartTime(): string {
  const year = M(date).year()
  const month = M(date).month()
  const day = M(date).dayOfYear()

  const hour = M(startTime).hour()
  const minute = M(startTime).minute()

  return M().year(year).month(month).dayOfYear(day).hour(hour).minute(minute).second(0).format()
}

function cloneState(): RState {
  return {
    shift: {
      editor: {
        newShift: Object.assign({}, getShiftBeingCreated(state)),
        shiftDate: getShiftDate(state),
        employeesInShift: Object.assign([], getEmployeesInShiftBeingCreated(state))
      }
    }
  }
}
