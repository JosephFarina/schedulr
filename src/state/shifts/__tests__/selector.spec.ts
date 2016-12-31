import * as M from 'moment'

import * as I from './../../../models'
import { getShiftsByDay } from './../selector'

const shifts: I.Shifts = {
  asfjkdfj: {
    startTime: M().weekday(0).format(),
    duration: 1434348
  },
  asdfa3fv: {
    startTime: M().weekday(2).format(),
    duration: 423434
  },
  asdfafdddaf3fv: {
    startTime: M().weekday(2).format(),
    duration: 545
  },
  asdfafhhhh: {
    startTime: M().weekday(3).format(),
    duration: 1534334
  }
}


describe('Shift Selectors', () => {
  it('should only return the shifts of the same day', () => {
    const firstWeekDay = getShiftsByDay(M().weekday(0), shifts)
    expect(firstWeekDay).toEqual(
      [shifts["asfjkdfj"]]
    )

    const secondWeekDay = getShiftsByDay(M().weekday(2), shifts)
    expect(secondWeekDay).toEqual(
      [
        shifts['asdfa3fv'],
        shifts['asdfafdddaf3fv']
      ]
    )

    const thirdWeekDay = getShiftsByDay(M().weekday(3), shifts)
    expect(thirdWeekDay).toEqual([
      shifts['asdfafhhhh']
    ])

  })
})
