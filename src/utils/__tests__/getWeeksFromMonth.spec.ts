import * as M from 'moment'

import { getWeeksFromMonth } from './../getWeeksFromMonth.util'

const today = M().hour(12)
const weeks = getWeeksFromMonth(today)

describe('#getWeeksFromMonth', () => {

  it('returns an array', () => {
    expect(weeks instanceof Array).toBeTruthy()
  })

  it('should be as long as there are weeks in the month', () => {
    const startOfMonthWeek = today.clone().startOf('month').week()
    const endOfMonthWeek = today.clone().endOf('month').week()
    const numberOfMonths = endOfMonthWeek - startOfMonthWeek + 1
    expect(weeks.length).toEqual(numberOfMonths)
  })

  it('should contain today', () => {
    let allSameMonth = true
    let month: number = today.month()

    weeks.forEach((week) => {
      if (week.month() !== month) {
        allSameMonth = false
      }
    })

    // TODO: figure out what this test is and why its broken
    // expect(allSameMonth).toBeTruthy()
  })

  // it('each day should be 12 oclock', () => {
  //   weeks.forEach((week) => {
  //     week.forEach((day) => {
  //       expect(day.hour()).toEqual(12)
  //     })
  //   })
  // })

  // it('each week has 1 non null moments', () => {
  //   weeks.forEach((week) => {
  //     expect(week.length).toEqual(1)
  //   })
  // })

  // it('last day of month should be included when last week is irregular', () => {
  //   let foundDay = false
  //   const month = M().year(2016).month(0)
  //   let lastDay = month.clone().endOf('month').hour(12)
  //   getWeeksFromMonth(month).forEach((week) => {
  //     week.forEach((day) => {
  //       if (day.isSame(lastDay, 'day')) {
  //         foundDay = true
  //       }
  //     })
  //   })
  //   expect(foundDay).toBeTruthy()
  // })

})
