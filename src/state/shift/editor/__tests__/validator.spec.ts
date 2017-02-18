// import * as M from 'moment'

// import { RState, RShiftEditor } from 'src/models'
// import * as Editor from './../'


// describe('Shift Editor Auth', () => {

//   it('should tell you you need client if absent', () => {
//     const state: RState = makeState({
//       newShift: {
//         client: ''
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).client).toEqual(['Client must be present'])
//   })

//   it('should be null if client included', () => {
//     const state = makeState({
//       newShift: {
//         client: 'A Client name'
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).client).toBeUndefined()
//   })

//   it('should tell you if location is absent', () => {
//     const state = makeState({
//       newShift: {
//         location: ''
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).location).toEqual(['Location must be present'])
//   })

//   it('should be null if location is included', () => {
//     const state = makeState({
//       newShift: {
//         location: 'a location'
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).location).toBeUndefined()
//   })

//   it('should tell you if startime is absent', () => {
//     const state = makeState({
//       newShift: {
//         startTime: ''
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).startTime).toEqual(['Must be a valid time range'])
//   })

//   it('should be null if startTime is a valid time', () => {
//     const state = makeState({
//       newShift: {
//         startTime: M().format()
//       }
//     })

//     expect(Editor.Validators.newShiftValidator(state).startTime).toBeUndefined()
//   })
// })

// function makeState(editor: RShiftEditor): RState {
//   return {
//     shift: {
//       editor
//     }
//   }
// }







// // // TODO: FIXME: GET THE TESTS TO PASS SINCE CHANGING THE ENTTIY LAYOUT

// // import * as M from 'moment'

// // import {
// //   RState,
// //   Shift,
// //   ShiftTemplate,
// //   Employee,
// //   ValidatorResponseObject
// // } from 'src/models'

// // import {
// //   validateNewShifts
// // } from './../validator'

// // import { getEmployeeById } from 'src/state/entities'

// // const expectedMessages = {
// //   duration: {
// //     duration: ['It must be at least 15 minutes long']
// //   },
// //   client: {
// //     client: ['Client must be present']
// //   },
// //   location: {
// //     location: ['Location must be present']
// //   },
// //   startTime: (employees: Employee[]) => ({
// //     startTime: employees.map(employee => {
// //       console.log(employee, 'alias fails here')
// //       return `${employee.alias} is already scheduled at this time`
// //     })
// //   })
// // }

// // // shift two is the same employee but 30 mins after 
// // const employeeOneStart = M().hour(12).minute(0).second(0)
// // const employeeOneDuration = 120
// // const employeeTwoStart = employeeOneStart.clone().add(employeeOneDuration + 30).format()
// // const employeeTwoDuration = 120
// // const employees = ['employeeOne', 'employeeTwo']

// // describe('#shiftEditorValidator', () => {

// //   it('if all shifts are valid it should return an empty object', () => {
// //     const res = validateNewShifts(getState(['remployee', 'remployee1'], {
// //       client: 'qwasv',
// //       duration: 15,
// //       location: '3qweafsdz',
// //       startTime: M().format()
// //     }))

// //     expect(res).toEqual({})
// //   })

// //   it('if there is no client', () => {
// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: null,
// //         duration: 15,
// //         location: '3qweafsdz',
// //         startTime: M().format()
// //       },
// //       expectedMessages.client
// //     )
// //   })

// //   it('if there is no location', () => {
// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: 'null3qewaf',
// //         duration: 15,
// //         location: null,
// //         startTime: M().format()
// //       },
// //       expectedMessages.location
// //     )
// //   })

// //   it('if duration is less than 15', () => {
// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: 'null3qewaf',
// //         duration: 5,
// //         location: 'null12qewfda',
// //         startTime: M().format()
// //       },
// //       expectedMessages.duration
// //     )
// //   })

// //   it('if all client, location and duration are missing', () => {
// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: null,
// //         duration: 5,
// //         location: null,
// //         startTime: M().format()
// //       },
// //       Object.assign({}, expectedMessages.client, expectedMessages.duration, expectedMessages.location)
// //     )
// //   })

// //   it('if an employees startTime overlaps it should be returned in an array', () => {
// //     const employee = getEmployeeById(getState(), employees[0])

// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: '13qeasdf',
// //         location: 'null3qewfasdfd',
// //         startTime: employeeOneStart.format(),
// //         duration: employeeOneDuration,
// //       },
// //       expectedMessages.startTime([employee]),
// //       [employees[0]]
// //     )
// //   })

// //   it('if an multiple employees startTime overlaps it should be returned in an array', () => {
// //     testNoOneAndMultipleEmployees(
// //       {
// //         client: '13qeasdf',
// //         location: 'null3qewfasdfd',
// //         startTime: employeeOneStart.format(),
// //         duration: employeeOneDuration,
// //       },
// //       expectedMessages.startTime(employees.map(employee => getEmployeeById(getState(employees), employee))),
// //       employees
// //     )
// //   })

// // })

// // function testNoOneAndMultipleEmployees(
// //   newShift: ShiftTemplate,
// //   expectedResponse: ValidatorResponseObject<Shift>,
// //   employeesInShift: string[] = []
// // ) {
// //   [[], [employees[0]], [employees[1]], employees].forEach(employeeArray => {
// //     const res = validateNewShifts(getState(employeesInShift, newShift))
// //     expect(res).toEqual(expectedResponse)
// //   })
// // }

// // function getState(employeesInShift: string[] = [], newShift: ShiftTemplate = {}): RState {
// //   return {
// //     entities: {
// //       employees: {
// //         added: {},
// //         deleted: [],
// //         edited: {},
// //         raw: {
// //           [employees[0]]: {
// //             firstName: 'Joey',
// //             lastName: 'Farina',
// //             alias: 'J Farina'
// //           },
// //           [employees[1]]: {
// //             firstName: 'Shaya',
// //             lastName: 'AlArfaj',
// //             alias: 'S AlArfaj'
// //           }
// //         },
// //       },
// //       shifts: {
// //         raw: {
// //           'shift:raw:1': {
// //             id: 'shift:raw:1',
// //             employee: employees[0],
// //             startTime: employeeOneStart.format(),
// //             duration: employeeOneDuration
// //           },
// //           'shift:raw:2': {
// //             id: 'shift:raw:2',
// //             employee: employees[1],
// //             startTime: employeeTwoStart,
// //             duration: employeeTwoDuration
// //           }
// //         },
// //         added: {},
// //         deleted: [],
// //         edited: {}
// //       },
// //     },
// //     shift: {
// //       editor: {
// //         employeesInShift,
// //         newShift
// //       }
// //     }
// //   }
// // }
