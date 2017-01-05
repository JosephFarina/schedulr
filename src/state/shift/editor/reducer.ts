import {
  Action,
  RShiftEditor,
} from './../../../models'
import { ActionTypes } from './../../actionTypes'

export const initialState: RShiftEditor = {
  editedShift: null,
  newShift: null,
  selectedShift: null
}

const shiftEditor = (state = initialState, action: Action<RShiftEditor>): RShiftEditor => {
  switch (action.type) {

    case ActionTypes.updateEditedShift:
      return Object.assign({}, state, {
        editedShift: Object.assign({}, action.payload.editedShift)
      })

    case ActionTypes.updateNewShift:
      return Object.assign({}, state, {
        newShift: action.payload.newShift
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
