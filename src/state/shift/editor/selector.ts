import {
  RState,
  Shift
} from 'src/models'

export const getSelectedShiftId = (state: RState): string => state.shift.editor.selectedShift
export const getShiftBeingEdited = (state: RState): Shift => Object.assign({}, state.shift.editor.editedShift)
export const getShiftBeingCreated = (state: RState): Shift => Object.assign({}, state.shift.editor.newShift)
export const getEmployeesInShiftBeingCreated = (state: RState): string[] => state.shift.editor.employeesInShift
export const getShiftDate = (state: RState): string => state.shift.editor.shiftDate
export const getDatePickerMonth = (state: RState): string => state.shift.editor.datePickerMonth
