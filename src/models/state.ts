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
  shift?: RShift
  ui?: RUI
}

/**
 * 
 * Calendar State
 * 
 */

export interface RCalendar {
  date?: string
  timeRange?: TimeModels.TimeRangeOption
}

/**
 * 
 * Shift State
 * 
 */

export interface RShift {
  data?: RShiftData
  editor?: RShiftEditor
}

export interface RShiftData {
  shiftCacheTimeRange?: string
  shiftCacheIsValid?: boolean
  shifts?: ShiftModels.Shifts
  editedShifts?: ShiftModels.Shifts
  addedShifts?: ShiftModels.Shifts
  deletedShifts?: string[]
}

export interface RShiftEditor {
  newShift?: ShiftModels.Shift
  editedShift?: ShiftModels.Shift
  selectedShift?: string
}

/**
 * 
 * UI State
 * 
 */

export interface RUI {
  sidebar?: RSidebar
}

export declare type ScheduleSidebarMode = 'filter' | 'newShift' | 'editShift' | 'inspector'

export interface RSidebar {
  mode: ScheduleSidebarMode
}
