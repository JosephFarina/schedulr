// import {
//   RState,
//   Employee
// } from 'src/models'

// import {
//   employeesOne
// } from 'src/testUtils'

// import { getEmployeeHierarchy } from './../'

// const state: RState = {
//   entities: {
//     employees: employeesOne
//   }
// }

// const sortEmployeesPredicate = (a: Employee, b: Employee) => a.firstName < b.firstName ? -1 : 1

// describe('Entity Selectors', () => {

//   describe('#getEmployeeHierarchy', () => {

//     it('should return an array of only the employees that dont have managers', () => {
//       const expectedTopLevelEmployees = Object.keys(employeesOne)
//         .map(id => employeesOne[id])
//         .filter(employee => employee.manager === null)
//         .sort(sortEmployeesPredicate)


//       console.log(getEmployeeHierarchy(state))
//       const res = getEmployeeHierarchy(state).sort(sortEmployeesPredicate)
//       expect(res).toEqual(expectedTopLevelEmployees)
//     })

//     it('each employee should be included in the array', () => {
//       const employees = getEmployeeHierarchy(state)


//     })

//   })

// })
