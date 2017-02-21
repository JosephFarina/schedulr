import * as Crud from 'src/modules/entityCrudFactories'
import { Action, Locations } from 'src/models'
import { EmployeeFavorabilityActions } from 'src/state/actionTypes'

export const initialState = Crud.InitialState.mergeWith({

})

const employeeFavorabilityReducer = (state = initialState, action: Action<Locations>) => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(EmployeeFavorabilityActions, employeeFavorabilityReducer)
