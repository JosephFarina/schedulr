import {
  ShiftTemplate,
  Shifts,
} from 'src/models'

import {
  convertEntityArrToObj,
  convertShiftObjectToArray
} from './../convertShifts'

const shiftObject: Shifts = {
  f12345: {
    duration: 54444,
    id: 'f12345',
    startTime: '123434'
  },
  f2345: {
    duration: 123434,
    id: 'f2345',
    startTime: '21344134'
  }
}

const shiftArray: ShiftTemplate[] = Object.keys(shiftObject).map(shiftId => shiftObject[shiftId])

describe('#convertShiftObjectToArray', () => {
  it('should convert', () => {
    const res = convertShiftObjectToArray(shiftObject)
    expect(res).toEqual(shiftArray)
  })
})

describe('#convertShiftArrayToOBject', () => {
  it('should convert', () => {
    const res = convertEntityArrToObj(shiftArray)
    expect(res).toEqual(shiftObject)
  })
})
