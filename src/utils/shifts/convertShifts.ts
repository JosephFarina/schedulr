import {
  ShiftTemplate,
  Shift,
  Entity,
  Entities,
  Shifts,
  SharedShiftData
} from 'src/models'

export function convertShiftObjectToArray(shifts: Shifts): Shift[] {
  return Object.keys(shifts).map(shiftId => Object.assign({}, shifts[shiftId]))
}



export function convertEntityArrToObj(shifts: Entity[]): Shifts {
  const obj: Shifts = {}
  shifts.forEach(shift => {
    obj[shift.id] = Object.assign({}, shift)
  })
  return obj
}
