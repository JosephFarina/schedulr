import * as Crud from 'src/modules/entityCrudFactories'
import { Action, Employees } from 'src/models'
import { ShiftEntityActions } from 'src/state/actionTypes'

export const initialState: Employees = Crud.InitialState.mergeWith({

})

const employeesReducer = (state = initialState, action: Action<Employees>): Employees => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(ShiftEntityActions, employeesReducer)
