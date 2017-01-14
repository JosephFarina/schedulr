import {
  ShiftTemplate,
  Shift,
  Shifts,
  SharedShiftData
} from 'src/models'

export function convertShiftObjectToArray(shifts: Shifts): Shift[] {
  return Object.keys(shifts).map(shiftId => Object.assign({}, shifts[shiftId]))
}

export function convertShiftArrayToObject(shifts: SharedShiftData[]): Shifts {
  const obj: Shifts = {}
  shifts.forEach(shift => {
    obj[shift.id] = Object.assign({}, shift)
  })
  return obj
}
