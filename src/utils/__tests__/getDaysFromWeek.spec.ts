import * as M from 'moment'

import { getDaysFromWeek } from './../getDaysFromWeek.util'

const today = M().hour(12)
const week = getDaysFromWeek(today)

describe('#getWeekFromDate', () => {
  it('week should be an array', () => {
    expect(Array.isArray(week)).toBeTruthy()
  })

  it('week should have 7 days', () => {
    expect(week.length).toEqual(7)
  })

  it('only one week should be in the array', () => {
    let currWeek: number
    let otherWeekFound = false

    week.forEach((day) => {
      if (currWeek) {
        if (day.week() !== currWeek) {
          otherWeekFound = true
        }
      }
      currWeek = day.week()
    })

    expect(otherWeekFound).toBeFalsy()
  })
})
