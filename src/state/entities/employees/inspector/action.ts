import { Action } from 'src/models'
import { EmployeeEntityActions } from 'src/state/actionTypes'
import { EmployeeDetailAPICall, getEmployeeDetails } from 'src/api'

export const fetchEmployeeDetails = (employeeId: string) => (dispatch) => {
  dispatch({
    type: EmployeeEntityActions.fetchingEmployeeDetails,
    payload: true
  })

  getEmployeeDetails(employeeId).then(payload => {
    console.log(payload)
    dispatch({
      type: EmployeeEntityActions.receiveEmployeeDetails,
      payload
    })

    dispatch({
      type: EmployeeEntityActions.fetchingEmployeeDetails,
      payload: false
    })
  })
}
