import * as M from 'moment'
require('moment-range')

import {
  MorString,
  cloneOrCreateMo,
} from 'src/utils'


/**
 * 
 * Input can be empty, a string or a Moment object 
 * 
 * if empty it will use the current date 
 * 
 */


export const startOfWeek = (input?: MorString): M.Moment => {
  const date = cloneOrCreateMo(input)
  return date.startOf('week').startOf('day')
}

export const endOfWeek = (input?: MorString): M.Moment => {
  const date = cloneOrCreateMo(input)
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


export const nextWeek = (input?: MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.add(1, 'week')
}

export const previousWeek = (input?: MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.subtract(1, 'week')
}
