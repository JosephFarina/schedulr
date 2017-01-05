import {
  RState,
  Shift
} from './../../../models'

export const getSelectedShiftId = (state: RState): string => state.shift.editor.selectedShift
export const getShiftBeingEdited = (state: RState): Shift => Object.assign({}, state.shift.editor.editedShift)
export const getShiftBeingCreated = (state: RState): Shift => Object.assign({}, state.shift.editor.newShift)
