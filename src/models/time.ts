export interface Day {
  date: string
  isToday: boolean
}

// each day key is from 0 - 7 representing sun - sat
export interface Week {
  startDate: string
  endDate: string
  days: {
    [dayNumber: number]: Day
  }
}

// Used for calendar building -- each key is the weeks number in the year 
export interface TimeRange {
  [weekNumber: number]: Week
}
