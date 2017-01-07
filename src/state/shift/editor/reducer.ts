import { ShiftActions } from 'src/state/actionTypes'

import {
  Action,
  RShiftEditor,
  Shift
} from 'src/models'

export const initialState: RShiftEditor = {
  editedShift: null,
  employeesInShift: [],
  newShift: {
    duration: null,
    startTime: '',
    client: '',
    id: '',
    location: ''
  }
}

const shiftEditor = (state = initialState, action: Action<RShiftEditor>): RShiftEditor => {
  console.log('asdfasd', action, ShiftActions.addEmployeeToShift)
  switch (action.type) {

    /**
     * 
     * Add and remove employee shift
     * 
     */

    case ShiftActions.addEmployeeToShift:
      return Object.assign({}, state, {
        employeesInShift: state.employeesInShift.concat(<string>action.payload)
      })

    case ShiftActions.removeEmployeeFromShift:
      return Object.assign({}, state, {
        employeesInShift: state.employeesInShift.filter(id => id !== action.payload)
      })

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
