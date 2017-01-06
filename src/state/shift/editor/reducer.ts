import {
  Action,
  RShiftEditor,
  Shift
} from './../../../models'
import { ActionTypes } from './../../actionTypes'

export const initialState: RShiftEditor = {
  editedShift: null,
  employeesInShift: [],
  newShift: {
    duration: null,
    startTime: '',
    client: '',
    employee: [],
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

    case ActionTypes.addEmployeeToShift:
      return Object.assign({}, state, {
        employeesInShift: state.employeesInShift.concat(<string>action.payload)
      })

    case ActionTypes.removeEmployeeFromShift:
      return Object.assign({}, state, {
        employeesInShift: state.employeesInShift.filter(id => id !== action.payload)
      })

    /**
     * 
     * Update new employee shift -- can be full shift or indivual properties
     * 
     */

    case ActionTypes.updateNewShift:
      return Object.assign({}, state, {
        newShift: Object.assign({}, state.newShift, action.payload)
      })


    /**
     * 
     * 
     * 
     */

    case ActionTypes.updateEditedShift:
      return Object.assign({}, state, {
        editedShift: Object.assign({}, action.payload.editedShift)
      })


    case ActionTypes.clearShiftEditor:
      return Object.assign({}, state, {
        editedShift: null,
        newShift: null
      })

    default:
      return state
  }
}

export default shiftEditor
