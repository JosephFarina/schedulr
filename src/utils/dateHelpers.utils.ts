import * as M from 'moment'
require('moment-range')

import * as Models from './../models'
import { mode } from './math.utils'
import * as MomentHelpers from './momentHelpers.util'


/**
 * 
 * Input can be empty, a string or a Moment object 
 * 
 * if empty it will use the current date 
 * 
 */


export const startOfWeek = (input?: MomentHelpers.MorString): M.Moment => {
  const date = MomentHelpers.cloneOrCreateMo(input)
  return date.startOf('week').startOf('day')
}

export const endOfWeek = (input?: MomentHelpers.MorString): M.Moment => {
  const date = MomentHelpers.cloneOrCreateMo(input)
  return date.endOf('week').endOf('day')
}


/**
 * 
 * Input can be empty, a string or a Moment object 
 * 
 * if empty it will use the current date 
 * 
 */


export const startOfMonth = (month: number, year: number): M.Moment => {
  const date = M().year(year).month(month)
  console.log(date.month(), date.year())
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


export const nextWeek = (input?: MomentHelpers.MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.add(1, 'week')
}

export const previousWeek = (input?: MomentHelpers.MorString): M.Moment => {
  const currDate = startOfWeek(input)
  return currDate.subtract(1, 'week')
}


/**
 * 
 * @Param{start, end} args can be either string or a Moment but not undefined
 * 
 */


export const generateTimeRangeBuild = (startInput: MomentHelpers.MorString, endInput: MomentHelpers.MorString): Models.TimeRange => {
  const start = MomentHelpers.cloneOrCreateMo(startInput)
  const end = MomentHelpers.cloneOrCreateMo(endInput)
  const range = M.range([start, end])

  const timeRange: Models.TimeRange = {
    weeks: generateWeeks(range)
  }

  return timeRange
}

function generateWeeks(moRange: M.Range): Models.Weeks {
  const weeks = {}

  moRange.by('week', (m) => {
    weeks[m.week()] = generateWeek(m)
  })

  return weeks
}

function generateWeek(mo: M.Moment): Models.Week {
  return {
    year: mo.year(),
    days: generateDays(mo.clone())
  }
}

function generateDays(mo: M.Moment): Models.Days {
  return iterateDays((dayNum: number) => generateDay(mo, dayNum))
}

function generateDay(mo: M.Moment, dayNumber: number): Models.Day {
  const date = mo.clone().day(dayNumber)
  return {
    date: date.format(),
    isToday: M().isSame(date, 'day')
  }
}


/**
 * 
 * @Param{week: number, year?: number} 
 * @Return{month: number}
 * 
 * Return the number for the month that the week is in
 * 
 * if you dont enter the year it assumes the current year
 */


export const getMonthFromWeek = (week: number, year: number): number => {
  const monthValuesOfDaysInWeek = monthValueForEachDay(week, year)
  return mostCommonMonth(monthValuesOfDaysInWeek)
}

function monthValueForEachDay(week: number, year: number): number[] {
  const date = M().year(year).week(week)
  return iterateDays((dayNum: number) => date.clone().day(dayNum).month())
}

function mostCommonMonth(months: number[]): number {
  return mode(months)
}


/**
 * 
 * Utils
 * 
 */


function iterateDays(fn: any): any {
  return [0, 1, 2, 3, 4, 5, 6].map(fn)
}
