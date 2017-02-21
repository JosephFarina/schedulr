import * as EntityModels from './entities'
// import * as ShiftModels from './shift'
import * as TimeModels from './time'
import { RouterState } from 'react-router'

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
  // data?: RShiftData
  editor?: RShiftEditor
}

export interface RShiftData extends CrudState<RShift> {
  shiftCacheTimeRange?: string
  shiftCacheIsValid?: boolean
}

export interface RShiftEditor {
  employeesInShift?: string[]
  shiftDate?: string
  unparsedTimeRange?: string
  newShift?: EntityModels.ShiftTemplate
  generateShift?: boolean
}


/**
 * 
 * Entity State
 * 
 */

// Extend state interfaces with this if they implement the crud actions
export interface CrudState<T> {
  raw: EntityModels.Entities<T>
  added: EntityModels.Entities<T>
  edited: EntityModels.Entities<T>
  deleted: string[]
}


export interface REntities {
  clients?: CrudState<EntityModels.Clients>
  locations?: CrudState<EntityModels.Locations>
  employees?: REmployees
  shifts?: CrudState<EntityModels.Shifts>
  positions?: CrudState<EntityModels.Positions>
  employeeFavorability?: CrudState<EntityModels.EmployeeFavorability>
}

export interface REmployees {
  crud: REmployeesCrud
  inspector: REmployeeInspector
}

export declare type employeeViewOptions = 'hierarchy' | 'grid'
export interface REmployeesCrud extends CrudState<EntityModels.Employees> {
  search?: string
  view?: employeeViewOptions
}

export interface REmployeeInspector {
  fetching?: boolean
  upcomingShifts?: EntityModels.UnnormalizedShift[]
}



/**
 * 
 * Auth State
 * 
 */


export interface RAuth {
  login?: RAuthLogin
  register?: RAuthRegister
}

interface ApiInteraction {
  fetching?: boolean
  errors?: string[] | null
}

export interface RAuthLogin extends ApiInteraction {
  email?: string
  password?: string
}

export declare type RegistrationFields = 'orgName' | 'email' | 'password' | 'confirmPassword'

export interface RAuthRegister extends ApiInteraction {
  orgName?: string
  email?: string
  password?: string
  confirmPassword?: string
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
