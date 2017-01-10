import * as EntityModels from './entities'
import * as ShiftModels from './shift'
import * as TimeModels from './time'

export interface Action<T> {
  type: string
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
  entities?: REntities
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
  employeesInShift?: string[]
  shiftDate?: string
  datePickerMonth?: string
  editedShift?: ShiftModels.Shift
  selectedShift?: string
}



/**
 * 
 * Entity State
 * 
 */

export interface REntities {
  clients?: EntityModels.Clients
  locations?: EntityModels.Locations
  employees?: EntityModels.Employees
}



/**
 * 
 * UI State
 * 
 */

export interface RUI {
  sidebar?: RSidebar
  alert?: RAlert
}

export declare type ScheduleSidebarMode = 'filter' | 'newShift' | 'editShift' | 'inspector'

export interface RSidebar {
  mode: ScheduleSidebarMode
}

export declare type AlertOptions = 'snackbar'

export interface RAlert {
  type: AlertOptions
  message: string
}
