import * as M from 'moment'

import { getWeeksFromMonth } from './../getWeeksFromMonth.util'

const today = M().hour(12)
const weeks = getWeeksFromMonth(today)

describe('#getWeeksFromMonth', () => {

  it('returns an array of arrays', () => {
    expect(weeks instanceof Array).toBeTruthy()
    weeks.forEach((week) => {
      expect(Array.isArray(week)).toBeTruthy()
    })
  })

  it('should contain today', () => {
    let foundToday = false
    weeks.forEach((week) => {
      week.forEach((day) => {
        if (day.isSame(today, 'day')) {
          foundToday = true
        }
      })
    })
    expect(foundToday).toBeTruthy()
  })

  it('each day should be 12 oclock', () => {
    weeks.forEach((week) => {
      week.forEach((day) => {
        expect(day.hour()).toEqual(12)
      })
    })
  })

  it('each week has 7 non null moments', () => {
    weeks.forEach((week) => {
      expect(week.length).toEqual(7)
    })
  })

  it('last day of month should be included when last week is irregular', () => {
    let foundDay = false
    const month = M().year(2016).month(0)
    let lastDay = month.clone().endOf('month').hour(12)
    getWeeksFromMonth(month).forEach((week) => {
      week.forEach((day) => {
        if (day.isSame(lastDay, 'day')) {
          foundDay = true
        }
      })
    })
    expect(foundDay).toBeTruthy()
  })

})
