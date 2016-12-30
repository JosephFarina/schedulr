export interface Day {
  date: string
  isToday: boolean
}

// each day key is from 0 - 7 representing sun - sat
export interface Days {
  [dayNumber: number]: Day
}

export interface Week {
  year: number
  days: Days
}

// each key is the weeks number in the year 
export interface Weeks {
  [weekNumber: number]: Week
}

// Used for calendar building
export interface TimeRange {
  month?: number
  weeks: Weeks
}

export declare type TimeRangeOption = 'week' | 'month'

// export interface DayWithShifts

// export interface CalendarObject<DayType> {
//   month?: number
//   // weeks: Weeks<DayType>
// }

// export interface Weeks<DayType> {

// }