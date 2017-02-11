import { Action } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'

export const mergeWith = <T>(crudActionTypeObj: Crud.ActionTypes.CrudActionTypes, reducer) => (state, action: Action<any>): T => {
  const crudState = crudReducer(crudActionTypeObj, state, action)
  return crudState === null ? reducer(state, action) : crudState
}

function crudReducer(crudActionTypeObj: Crud.ActionTypes.CrudActionTypes, state, action) {

  switch (action.type) {

    case crudActionTypeObj.add:
    case crudActionTypeObj.removeAdded:
      return Object.assign({}, state, {
        added: action.payload
      })

    case crudActionTypeObj.edit:
    case crudActionTypeObj.removeEdited:
      return Object.assign({}, state, {
        edited: action.payload
      })

    case crudActionTypeObj.delete:
    case crudActionTypeObj.removeDeleted:
      return Object.assign({}, state, {
        deleted: action.payload
      })

    default:
      return null
  }
}


/*
const shiftData = (state = initialState, action: Action<RShiftData>): RShiftData => {
  switch (action.type) {

    // Add and remove added shifts
    case ShiftActions.add:
      return Object.assign({}, state, {
        addedShifts: Object.assign({}, state.addedShifts, action.payload)
      })

    case ShiftActions.removeAdd:
      return Object.assign({}, state, {
        addedShifts: action.payload
      })

    // Add and remove edited shifts
    case ShiftActions.edit:
      return Object.assign({}, state, {
        editedShifts: action.payload
      })

    case ShiftActions.removeEdit:
      return Object.assign({}, state, {
        editedShifts: action.payload
      })

    // Add and remove delete shifts
    case ShiftActions.delete:
      return Object.assign({}, state, {
        deletedShifts: action.payload
      })

    case ShiftActions.removeDelete:
      return Object.assign({}, state, {
        deletedShifts: action.payload
      })

    default:
      return state
  }
}
*/