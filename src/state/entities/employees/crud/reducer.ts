import * as Crud from 'src/modules/entityCrudFactories'
import { Action, REmployeesCrud, Employee } from 'src/models'
import { EmployeeEntityActions } from 'src/state/actionTypes'

export const initialState = Crud.InitialState.mergeWith<Employee, REmployeesCrud>({
  search: '',
  view: 'grid'
})

const employeesReducer = (state = initialState, action: Action<REmployeesCrud>): REmployeesCrud => {
  switch (action.type) {
    case EmployeeEntityActions.search:
      return Object.assign({}, state, {
        search: action.payload
      })

    case EmployeeEntityActions.changeView:
      return Object.assign({}, state, {
        view: action.payload
      })

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(EmployeeEntityActions, employeesReducer)
