import { ActionTypes } from './../state/actionTypes'
import * as ShiftModels from './shift'
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
  calendar?: RCalendar
  shifts?: RShifts
}

// The Calendar Slice of State
export interface RCalendar {
  date?: string
  timeRange?: TimeModels.TimeRangeOption
}

// The Shifts Slice of State
export interface RShifts {
  shiftCacheTimeRange?: string
  shiftCacheIsValid?: boolean

  shifts?: ShiftModels.Shifts
  editedShifts?: ShiftModels.Shifts
  addedShifts?: ShiftModels.Shifts
  deletedShifts?: string[]
}
