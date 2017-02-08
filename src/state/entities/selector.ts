import {
  Clients,
  Employee,
  Employees,
  NestedEmployee,
  Locations,
  RState,
} from 'src/models'

export const getClients = (state: RState): Clients => state.entities.clients

export const getEmployees = (state: RState): Employees => state.entities.employees
export const getEmployeeById = (state: RState, id: string): Employee => state.entities.employees[id]

export const getLocations = (state: RState): Locations => state.entities.locations

// export function getEmployeeHierarchy(state: RState): NestedEmployee[] {
//   const employees = getEmployees(state)
//   // return Object.keys(employees).map(id => employees[id]).filter(employee => employee.manager === null)

//   const managers = Object.keys(employees).reduce((res, employeeId) => {
//     const employee = employees[employeeId]
//     const {manager} = employee
//     if (manager !== null) {
//       return Object.assign({}, res, {
//         [manager]: Array.isArray(res[manager]) ? res[manager].concat([employee]) : [employee]
//       })
//     }

//     return res
//   }, {})

//   console.log(JSON.stringify(managers))
//   return null
// }

/*

const firstLevel = {}

for employee in employees
  const {manager} = employee
  if (manager !== null) {
    const employeesAlreadyInManager = firstLevel[manager]

    firstLevel = Object.assign({}, firstLevel, {
      [manager]: employeesAlreadyInManager.concat([employee])
    })
  }


*/
