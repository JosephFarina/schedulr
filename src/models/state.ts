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
  auth?: RAuth
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
  newShift?: ShiftModels.ShiftTemplate
  employeesInShift?: string[]
  shiftDate?: string
  datePickerMonth?: string
  editedShift?: ShiftModels.ShiftTemplate
  selectedShift?: string
  generateShift?: boolean
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
 * Auth State
 * 
 */


export interface RAuth {
  email?: string
  password?: string
  fetchingLogin?: boolean
  loginSuccesfull?: boolean
  errorMessage?: string | null
}


/**
 * 
 * UI State
 * 
 */


export interface RUI {
  sidebar?: RSidebar
  notification?: RNotification
  modal?: RModal
}

export declare type ScheduleSidebarMode = 'filter' | 'newShift' | 'editShift' | 'inspector'
export interface RSidebar {
  mode: ScheduleSidebarMode
}

export interface RNotification {
  messages: string[]
}

export declare type ModalMode = 'shiftApproval'
export interface RModal {
  modalType: ModalMode,
  modalProps: {}
}
