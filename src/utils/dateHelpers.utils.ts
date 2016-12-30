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


/**
 * 
 * Generate CalendarBuilds -- with and with shifts
 * 
 * The start and end times can be either moments or strings
 * 
 */


export const generateCalendarBuildDateOnly = (
  startTimeInput: MUtil.MorString,
  endTimeInput: MUtil.MorString,
): I.CalendarObject<I.DateOnly> => {

  const range = MUtil.rangeFromMoOrString(startTimeInput, endTimeInput)
  return {
    weeks: generateWeeksDateOnly(range)
  }
}



/*
 *
 *  Generate Calendar Build Of Shift Objects
 *
 */

interface BuildParams {
  start: MUtil.MorString
  end: MUtil.MorString
  shifts?: I.Shifts
}

interface WeekParams {
  range: M.Range
  shifts?: I.Shifts
}

interface DayParams {
  week: M.Moment
  day: number
  shifts?: I.Shifts
}

/**
 * 
 * 
 * Builds A Version of a CalendarObject that has shifts in it
 * 
 */

export const generateCalendarBuildWithShifts = (params: BuildParams): I.CalendarObject<I.DayWithShifts> => {
  const {start, end, shifts} = params
  const range = MUtil.rangeFromMoOrString(start, end)
  return { weeks: generateWeeksWithShifts({ range, shifts }) }
}

function generateWeeksWithShifts(params: WeekParams): I.Weeks<I.DayWithShifts> {
  const {range, shifts} = params
  return mapByWeeks(range, (week: M.Moment) => {
    return {
      year: week.year(),
      days: iterateDays((day: number) => generateDayWithShifts({ week, day, shifts }))
    }
  })
}

function generateDayWithShifts(params: DayParams): I.DayWithShifts {
  const {week, day, shifts} = params
  const date = week.clone().day(day)
  return {
    date: date.format(),
    shifts: getShiftsByDay(date, shifts)
  }
}

function getShiftsByDay(date: M.Moment, shifts: I.Shifts): I.Shifts {
  // 
  return
}













function generateWeeksDateOnly(moRange: M.Range): I.Weeks<I.DateOnly> {
  return mapByWeeks(moRange, (m: M.Moment) => {
    return {
      year: m.year(),
      days: iterateDays((dayNum: number) => {
        const date = m.clone().day(dayNum)
        return {
          date: date.format(),
          isToday: M().isSame(date, 'day')
        }
      })
    }
  })
}

function mapByWeeks(moRange: M.Range, fn: any): I.Weeks<any> {
  const weeks = {}

  moRange.by('week', (m) => {
    weeks[m.week()] = fn(m)
  })

  return weeks
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

export function getWeekMonthAndYearFromDate(input: MUtil.MorString): { week: number, month: number, year: number } {
  const date = MUtil.cloneOrCreateMo(input)
  const week = MUtil.getWeek(date)
  const year = MUtil.getYear(date)
  const month = getMonthFromWeek(week, year)

  return {
    week,
    month,
    year
  }
}

function iterateDays(fn: any): any {
  return [0, 1, 2, 3, 4, 5, 6].map(fn)
}
