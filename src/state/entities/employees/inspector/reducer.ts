import { Action, REmployeeInspector } from 'src/models'
import { EmployeeEntityActions } from 'src/state/actionTypes'

export const initialState: REmployeeInspector = {
  fetching: false,
  upcomingShifts: []
}

const employeesReducer = (state = initialState, action: Action<REmployeeInspector>): REmployeeInspector => {
  switch (action.type) {
    case EmployeeEntityActions.fetchingEmployeeDetails:
      return Object.assign({}, state, {
        fetching: action.payload
      })

    case EmployeeEntityActions.receiveEmployeeDetails:
      return Object.assign({}, state, {
        upcomingShifts: action.payload.upcomingShifts
      })

    default:
      return state
  }
}

export default employeesReducer
