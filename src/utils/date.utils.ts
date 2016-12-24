import * as M from 'moment'
require('moment-range')

import * as Models from './../models'

export const getWeekRange = (startDay: string, endDay: string): Models.WeekRange => {
  const x = M().clone()
  return <Models.WeekRange> {}
}

export const startOfMonth = (input: M.Moment): M.Moment => {
  const date = input.clone()
  return date.startOf('month').startOf('week')
}
