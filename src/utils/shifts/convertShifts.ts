import {
  Shift,
  Shifts
} from 'src/models'

export function convertShiftObjectToArray(shifts: Shifts): Shift[] {
  return Object.keys(shifts).map(shiftId => Object.assign({}, shifts[shiftId]))
}

export function convertShiftArrayToObject(shifts: Shift[]): Shifts {
  const obj: Shifts = {}
  shifts.forEach(shift => {
    obj[shift.id] = Object.assign({}, shift)
  })
  return obj
}
