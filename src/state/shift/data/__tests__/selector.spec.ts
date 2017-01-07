import * as M from 'moment'

import {
  getAddedShifts,
  getDeletedShifts,
  getEditedShifts,
  getRawShifts,
  getShifts,
  getShiftsByDay,
} from './../selector'
import * as I from 'src/models'

const shifts: I.Shifts = {
  asfjkdfj: {
    id: 'asfjkdfj',
    startTime: M().weekday(0).format(),
    duration: 1434348
  },
  asdfa3fv: {
    id: 'asdfa3fv',
    startTime: M().weekday(2).format(),
    duration: 423434
  },
  asdfafdddaf3fv: {
    id: 'asdfafdddaf3fv',
    startTime: M().weekday(2).format(),
    duration: 545
  },
  asdfafhhhh: {
    id: 'asdfafhhhh',
    startTime: M().weekday(3).format(),
    duration: 1534334
  }
}

const editedShifts: I.Shifts = {
  asdfafhhhh: {
    id: 'asdfafhhhh',
    startTime: M().weekday(6).format(),
    duration: 1534334
  },
  asdfa3fv: {
    id: 'asdfa3fv',
    startTime: M().weekday(5).format(),
    duration: 132455544
  }
}

const addedShifts: I.Shifts = {
  gjjalkjsdfj: {
    id: 'gjjalkjsdfj',
    startTime: M().weekday(2).format(),
    duration: 154890004
  }
}

const deletedShifts: string[] = ['asdfafhhhh', 'asdfafdddaf3fv']

describe('Shift Selectors', () => {

  describe('#getShiftsByDay', () => {

    it('should only return the shifts of the same day', () => {
      // const firstWeekDay = getShiftsByDay(M().weekday(0), shifts)
      // expect(firstWeekDay).toEqual([shifts["asfjkdfj"]])

      // const secondWeekDay = getShiftsByDay(M().weekday(2), shifts)
      // expect(secondWeekDay).toEqual([
      //   shifts['asdfa3fv'],
      //   shifts['asdfafdddaf3fv']
      // ])

      // const thirdWeekDay = getShiftsByDay(M().weekday(3), shifts)
      // expect(thirdWeekDay).toEqual([
      //   shifts['asdfafhhhh']
      // ])

    })

  })

  describe('#getShifts', () => {

    it('it should replace edited shifts', () => {
      const state: I.RState = {
        shift: {
          data: {
            shifts,
            editedShifts,
            addedShifts: {},
            deletedShifts: []
          }
        }
      }

      const res = getShifts(state)

      Object.keys(editedShifts).forEach((editedShiftKey) => {
        const editedShift = editedShifts[editedShiftKey]
        expect(res).toContain(editedShift)
      })
    })

    it('should mix in newly added shifts', () => {
      const state: I.RState = {
        shift: {
          data: {
            shifts,
            addedShifts,
            editedShifts: {},
            deletedShifts: []
          }
        }
      }
      const res = getShifts(state)
      Object.keys(addedShifts).forEach((addedShiftKey) => {
        const addedShift = addedShifts[addedShiftKey]
        expect(res).toContain(addedShift)
      })
      // should still contain all other shifts
      Object.keys(shifts).forEach(shiftId => {
        expect(res).toContain(shifts[shiftId])
      })
    })

    it('should remove the delete shifts', () => {
      const state: I.RState = {
        shift: {
          data: {
            shifts,
            addedShifts: {},
            editedShifts: {},
            deletedShifts
          }
        }
      }
      const res = getShifts(state)
      deletedShifts.forEach(deletedShiftId => {
        const resIds = Object.keys(res)
        expect(resIds.indexOf(deletedShiftId) < 0).toBeTruthy()
      })

      Object.keys(shifts).forEach((shiftId) => {
        const shift = shifts[shiftId]
        if (deletedShifts.indexOf(shift.id) < 0) {
          expect(res).toContain(shift)
        }
      })
    })

  })

})
