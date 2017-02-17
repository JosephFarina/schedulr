import * as M from 'moment'
import { ShiftActions } from 'src/state/actionTypes'

import {
  Action,
  RShiftEditor,
  ShiftTemplate
} from 'src/models'

export const initialState: RShiftEditor = {
  employeesInShift: [],
  shiftDate: M().format(),
  generateShift: false,
  unparsedTimeRange: '',
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
    // New Vlaues

    case ShiftActions.setEmployeesInShift:
      return Object.assign({}, state, {
        employeesInShift: action.payload
      })

    case ShiftActions.setClientInShift:
      return Object.assign({}, state, {
        newShift: Object.assign({}, state.newShift, {
          client: action.payload
        })
      })

    case ShiftActions.setLocationInShift:
      return Object.assign({}, state, {
        newShift: Object.assign({}, state.newShift, {
          location: action.payload
        })
      })

    case ShiftActions.updateShiftDate:
      return Object.assign({}, state, {
        shiftDate: action.payload
      })

    case ShiftActions.setShiftTimeAndDuration:
      return Object.assign({}, state, {
        newShift: Object.assign({}, state.newShift, action.payload)
      })

    case ShiftActions.setUnparsedTimeRange:
      return Object.assign({}, state, {
        unparsedTimeRange: action.payload
      })


    // Old values
    /**
     * 
     * Add and remove employee shift
     * 
     */

    case ShiftActions.addEmployeeToShift:
      const employeeAlreadyInState = state.employeesInShift.indexOf(<string> action.payload) >= 0
      const nextEmployeesInShift = employeeAlreadyInState ? state.employeesInShift : state.employeesInShift.concat(<string> action.payload)
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

    // case ShiftActions.updateEditedShift:
    //   return Object.assign({}, state, {
    //     editedShift: Object.assign({}, action.payload.editedShift)
    //   })


    case ShiftActions.clearShiftEditor:
      return Object.assign({}, state, {
        editedShift: null,
        newShift: null
      })

    case ShiftActions.resetEditor:
      return initialState

    default:
      return state
  }
}

export default shiftEditor
