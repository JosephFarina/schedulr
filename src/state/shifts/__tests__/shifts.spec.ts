import * as Models from './../../../models'
import * as Actions from './../action'
import shift from './../reducer'

const shifts: Models.Shifts = {
  one: {
    id: 'one',
    startTime: 'asf',
    duration: 500
  },
  two: {
    id: 'two',
    startTime: 'asf',
    duration: 500
  },
  three: {
    id: 'three',
    startTime: 'hello',
    duration: 139
  }
}

describe('Shift State', () => {

  it('reducer should output the correct state', () => {
    // const state = shift(undefined, Actions.addShifts(shifts))
    // expect(state).toEqual({
    //   ids: Object.keys(shifts),
    //   shifts
    // })
  })

  it('should create a CalendarObject for the shifts', () => {})

})
