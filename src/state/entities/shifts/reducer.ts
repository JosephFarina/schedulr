import * as Crud from 'src/modules/entityCrudFactories'
import { Action, RShiftData, } from 'src/models'
import { ShiftEntityActions } from 'src/state/actionTypes'

export const initialState: RShiftData = Crud.InitialState.mergeWith({
  shiftCacheIsValid: false,
  shiftCacheTimeRange: null,
})

const shiftReducer = (state = initialState, action: Action<RShiftData>): RShiftData => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(ShiftEntityActions, shiftReducer)
