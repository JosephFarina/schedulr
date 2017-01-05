import {
  Action,
  RShiftEditor,
  Shift
} from './../../../models'
import { ActionTypes } from './../../actionTypes'

// export function updateEditedShift(shift: Shift): Action<RShiftEditor> {
//   return {
//     type: ActionTypes.updateEditedShift,
//     payload: {
//       editedShift: Object.assign({}, shift)
//     }
//   }
// }

export function updateNewShift(shift: Shift): Action<RShiftEditor> {
  return {
    type: ActionTypes.updateNewShift,
    payload: {
      newShift: Object.assign({}, shift)
    }
  }
}

export function clearShiftEditor(): Action<RShiftEditor> {
  return {
    type: ActionTypes.clearShiftEditor,
    payload: {
      newShift: null,
      selectedShift: null
    }
  }
}