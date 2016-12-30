import { Shifts } from './shift'

export declare type TimeRangeOption = 'week' | 'month'

export interface CalendarObject<DayType> {
  month?: number
  weeks: Weeks<DayType>
}

export interface Weeks<DayType> {
  [weekNumber: number]: Week<DayType>
}

export interface Week<DayType> {
  year: number
  days: Days<DayType>
}

export interface Days<DayType> {
  [dayNumber: number]: DayType
}

interface Day {
  date: string
}

export interface DateOnly extends Day {
  isToday: boolean
}

export interface DayWithShifts extends Day {
  shifts: Shifts
}
