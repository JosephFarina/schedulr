export const CalendarActions = {
  updateDate: 'CalendarActions::updateDate',
  updateTimeRange: 'CalendarActions::updateTimeRange',
}

export const ShiftActions = {
  // data
  addShifts: 'ShiftActions::data::addShifts',
  removeAddedShifts: 'ShiftActions::data::removeAddedShifts',
  editShifts: 'ShiftActions::data::editShifts',
  removeEditedShifts: 'ShiftActions::data::removeEditedShifts',
  deleteShifts: 'ShiftActions::data::deleteShifts',
  removeDeletedShifts: 'ShiftActions::data::removeDeletedShifts',

  // editor
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
