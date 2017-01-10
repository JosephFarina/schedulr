import * as M from 'moment'
import { ShiftActions } from 'src/state/actionTypes'

import {
  Action,
  RShiftEditor,
  Shift
} from 'src/models'

export const initialState: RShiftEditor = {
  editedShift: null,
  employeesInShift: [],
  shiftDate: M().format(),
  datePickerMonth: M().format(),
  newShift: {
    duration: null,
    startTime: '',
    client: '',
    id: '',
    location: ''
  }
}

const shiftEditor = (state = initialState, action: Action<RShiftEditor>): RShiftEditor => {
  switch (action.type) {

    /**
     * 
     * Add and remove employee shift
     * 
     */

    case ShiftActions.addEmployeeToShift:
      const employeeAlreadyInState = state.employeesInShift.indexOf(<string>action.payload) >= 0
      const nextEmployeesInShift = employeeAlreadyInState ? state.employeesInShift : state.employeesInShift.concat(<string>action.payload)
      return Object.assign({}, state, {
        employeesInShift: nextEmployeesInShift
      })

    case ShiftActions.removeEmployeeFromShift:
      return Object.assign({}, state, {
        employeesInShift: state.employeesInShift.filter(id => id !== action.payload)
      })

    /**
     * 
     * Change shift date
     * 
     */

    case ShiftActions.updateShiftDate:
      return Object.assign({}, state, {
        shiftDate: action.payload
      })

    /**
     * 
     * Change date picker date
     * 
     */

    case ShiftActions.updateDatePickerDate:
      return Object.assign({}, state, {
        datePickerMonth: action.payload
      })

    /**
     * 
     * Add 
     * 
     */

    /**
     * 
     * Update new employee shift -- can be full shift or indivual properties
     * 
     */

    case ShiftActions.updateNewShift:
      return Object.assign({}, state, {
        newShift: Object.assign({}, state.newShift, action.payload)
      })


    /**
     * 
     * 
     * 
     */

    case ShiftActions.updateEditedShift:
      return Object.assign({}, state, {
        editedShift: Object.assign({}, action.payload.editedShift)
      })


    case ShiftActions.clearShiftEditor:
      return Object.assign({}, state, {
        editedShift: null,
        newShift: null
      })

    default:
      return state
  }
}

export default shiftEditor
