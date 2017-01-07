export enum ActionTypes {

  /**
   * 
   * Calendar ActionTypes
   * 
   */

  updateDate,
  updateTimeRange,

  /**
   * 
   * Shift ActionTypes
   * 
   */

  // data
  addShifts,
  removeAddedShifts,
  editShifts,
  removeEditedShifts,
  deleteShifts,
  removeDeletedShifts,

  // editor
  updateEditedShift,
  updateNewShift,
  clearShiftEditor,
  addEmployeeToShift,
  removeEmployeeFromShift,

  /**
   * 
   * Entities ActionTypes
   * 
   */

  setClients,
  addClient,
  setEmployees,
  addEmployee,
  setLocations,
  addLocation,

  /**
   * 
   * UI Action types
   * 
   */

  // sidebar
  changeScheduleSidebarMode
}
