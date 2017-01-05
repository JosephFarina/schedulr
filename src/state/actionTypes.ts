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

  /**
   * 
   * UI Action types
   * 
   */

  // sidebar
  changeScheduleSidebarMode


}
