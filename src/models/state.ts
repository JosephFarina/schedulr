import { ActionTypes } from './../state/actionTypes'
import * as TimeModels from './time'

export interface Action<T> {
  type: ActionTypes
  payload: T
}

/**
 * 
 * ReducerStates
 * Prefixed with R 
 */

// The Master State
export interface RState {
  calendar: RCalendar
}


// The Calendar Slice of State
export interface RCalendar {
  startDate?: string
  timeRange?: TimeModels.TimeRangeOption
}

// The Shifts Slice of State
export interface RShifts {
  ids: string[]
}