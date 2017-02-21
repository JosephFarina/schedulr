import { employeeViewOptions } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'

export const CalendarActions = {
  updateDate: 'CalendarActions::updateDate',
  updateTimeRange: 'CalendarActions::updateTimeRange',
}


export const ShiftEntityActions = Crud.ActionTypes.mergeWith<{}>('Shifts', {})
export const EmployeeEntityActions = Crud.ActionTypes.mergeWith<{
  search: string
  changeView: string
  fetchingEmployeeDetails: string
  receiveEmployeeDetails: string
  errorFetchingEmployeeDetails: string
}>('Employee', {
  search: 'search',
  changeView: 'changeView',
  receiveEmployeeDetails: 'receiveEmployeeDetails',
  fetchingEmployeeDetails: 'fetchingEmployeeDetails',
  errorFetchingEmployeeDetails: 'errorFetchingEmployeeDetails'
})
export const ClientEntityActions = Crud.ActionTypes.mergeWith<{}>('Client', {})
export const LocationEntityActions = Crud.ActionTypes.mergeWith<{}>('Location', {})
export const PositionEntityActions = Crud.ActionTypes.mergeWith<{}>('Position', {})
export const EmployeeFavorabilityActions = Crud.ActionTypes.mergeWith<{}>('EmployeeFavorability', {})









export const ShiftActions = {
  // new
  setEmployeesInShift: 'ShiftActions::editor::setEmployeesInShift',
  setClientInShift: 'ShiftActions::editor::setClientInShift',
  setLocationInShift: 'ShiftActions::editor::setLocationInShift',
  setShiftTimeAndDuration: 'ShiftActions::editor::setShiftTimeAndDuration',
  setUnparsedTimeRange: 'ShiftActions::editor::setUnparsedTimeRange',

  // old
  updateEditedShift: 'ShiftActions::editor::updateEditedShift',
  updateNewShift: 'ShiftActions::editor::updateNewShift',
  clearShiftEditor: 'ShiftActions::editor::clearShiftEditor',
  addEmployeeToShift: 'ShiftActions::editor::addEmployeeToShift',
  removeEmployeeFromShift: 'ShiftActions::editor::removeEmployeeFromShift',
  updateShiftDate: 'ShiftActions::editor::updateShiftDate',
  updateDatePickerDate: 'ShiftActions::editor::updateDatePickerDate',
  initiateShiftGeneration: 'ShiftActions::editor::initiateShiftGeneration',
  resetEditor: 'ShiftActions::editor::resetEditor'
}

export const EntitiesActions = {
  setClients: 'EntitiesActions::setClients',
  addClient: 'EntitiesActions::addClient',
  setEmployees: 'EntitiesActions::setEmployees',
  addEmployee: 'EntitiesActions::addEmployee',
  setLocations: 'EntitiesActions::setLocations',
  addLocation: 'EntitiesActions::addLocation',
}

export const UIActions = {
  updateNotifcationState: 'UIActions::updateNotifcationState',
  changeScheduleSidebarMode: 'UIActions::changeScheduleSidebarMode',
  showModal: 'UIActions::showModal',
  hideModal: 'UIActions::hideModal'
}

export const LoginActions = {
  updateCredentials: 'LoginActions::updateCredentials',
  requestInitiated: 'LoginActions::requestInitiated',
  loginRejected: 'LoginActions::loginRejected',
  loginSucceeded: 'LoginActions::loginSucceeded',

  requestLogin: 'LoginActions::requestLogin',
  loginFailed: 'LoginActions::loginFailed'
}

export const RegisterActions = {
  updateRegistrationField: 'RegisterActions::updateRegistrationField',
  requestInitiated: 'RegisterActions::requestInitiated',
  loginRejected: 'RegisterActions::loginRejected',
  succesfull: 'RegisterActions::succesfull',
}
