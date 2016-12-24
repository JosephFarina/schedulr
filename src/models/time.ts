export interface Day {
  date: string
  isInMonth: boolean
  isToday: boolean
  dayOfWeek: number
}

// each day key is from 0 - 7 representing sun - sat
export interface Week {
  startDate: string
  endDate: string
  weekOfMonth: number
  days: {
    [dayNumber: number]: Day
  }
}

// Used for calendar building -- each key is the weeks number in the year 
export interface WeekRange {
  [weekNumber: number]: Week
}
