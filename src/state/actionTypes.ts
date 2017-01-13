export const CalendarActions = {
  updateDate: 'updateDate',
  updateTimeRange: 'updateTimeRange',
}

export const ShiftActions = {
  // data
  addShifts: 'addShifts',
  removeAddedShifts: 'removeAddedShifts',
  editShifts: 'editShifts',
  removeEditedShifts: 'removeEditedShifts',
  deleteShifts: 'deleteShifts',
  removeDeletedShifts: 'removeDeletedShifts',

  // editor
  updateEditedShift: 'updateEditedShift',
  updateNewShift: 'updateNewShift',
  clearShiftEditor: 'clearShiftEditor',
  addEmployeeToShift: 'addEmployeeToShift',
  removeEmployeeFromShift: 'removeEmployeeFromShift',
  updateShiftDate: 'updateShiftDate',
  updateDatePickerDate: 'updateDatePickerDate',
  initiateShiftGeneration: 'initiateShiftGeneration'
}

export const EntitiesActions = {
  setClients: 'setClients',
  addClient: 'addClient',
  setEmployees: 'setEmployees',
  addEmployee: 'addEmployee',
  setLocations: 'setLocations',
  addLocation: 'addLocation',
}

export const UIActions = {
  updateNotifcationState: 'updateNotifcationState',
  changeScheduleSidebarMode: 'changeScheduleSidebarMode',
  showModal: 'showModal',
  hideModal: 'hideModal'
}
