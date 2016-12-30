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

export const generateCalendarBuildWithShifts = (
  startTimeInput: MUtil.MorString,
  endTimeInput: MUtil.MorString,
  shifts: I.Shifts
): I.CalendarObject<I.DayWithShifts> => {

  const range = MUtil.rangeFromMoOrString(startTimeInput, endTimeInput)
  const timeRange: I.CalendarObject<I.DayWithShifts> = {
    weeks: generateWeeks(range)
  }

  return
}

export const generateCalendarBuildDateOnly = (
  startTimeInput: MUtil.MorString,
  endTimeInput: MUtil.MorString,
): I.CalendarObject<I.DateOnly> => {

  const range = MUtil.rangeFromMoOrString(startTimeInput, endTimeInput)

  const timeRange: I.CalendarObject<I.DateOnly> = {
    weeks: generateWeeks(range)
  }

  return timeRange
}

// private methods

// function generateWeeksWithShifts(moRange: M.Range): Models.Weeks<

function generateWeeks(moRange: M.Range): I.Weeks<I.DateOnly> {
  const weeks = {}

  moRange.by('week', (m) => {
    weeks[m.week()] = generateWeek(m)
  })

  return weeks
}

function generateWeek(mo: M.Moment): I.Week<I.DateOnly> {
  return {
    year: mo.year(),
    days: generateDays(mo.clone())
  }
}

function generateDays(mo: M.Moment): I.Days<I.DateOnly> {
  return iterateDays((dayNum: number) => generateDay(mo, dayNum))
}

function generateDay(mo: M.Moment, dayNumber: number): I.DateOnly {
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
