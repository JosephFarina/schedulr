import * as M from 'moment'
require('moment-range')

import * as I from './../models'
import { mode } from './math.utils'
import * as MUtil from './momentHelpers.util'


/**
 * 
 * Input can be empty, a string or a Moment object 
 * 
 * if empty it will use the current date 
 * 
 */


export const startOfWeek = (input?: MUtil.MorString): M.Moment => {
  const date = MUtil.cloneOrCreateMo(input)
  return date.startOf('week').startOf('day')
}

export const endOfWeek = (input?: MUtil.MorString): M.Moment => {
  const date = MUtil.cloneOrCreateMo(input)
  return date.endOf('week').endOf('day')
}


/**
 * 
 * Input requires the month number and the year number
 * 
 */


export const startOfMonth = (month: number, year: number): M.Moment => {
  const date = M().year(year).month(month)
  return date.startOf('month').startOf('week').startOf('day')
}

export const endOfMonth = (month: number, year: number): M.Moment => {
  const date = M().year(year).month(month)
  return date.endOf('month').endOf('week').endOf('day')
}


/**
 * 
 * Will always return the startOfTheWeek
 * 
 * Can accept string, moment or nothing
 * 
 * if nothing it will default to the beginnning of the current week
 * 
 */


export const nextWeek = (input?: MUtil.MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.add(1, 'week')
}

export const previousWeek = (input?: MUtil.MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.subtract(1, 'week')
}
