// import {
//   // APIShiftInspector,
//   Action,
//   RState,
//   Shift,
// } from 'src/models'
// import { } from 'src/state/actionTypes'

// import {
//   cloneOrCreateMo,
//   durationAsString,
//   shiftAnalytics,
// } from 'src/utils'

// import {
//   getClientById,
//   getEmployeeById,
//   getLocationById,
// } from 'src/state/entities'

// export function getShiftInspectorAnalytics(shift: Shift) {
//   return (dispatch: Function, getStore: Function): Promise<APIShiftInspector> => {
//     return Promise.all([
//       shiftAnalytics(shift),
//       shiftInspectorAnalyticsFromStore(shift, getStore())
//     ]).then(([a, b]) => {
//       return {
//         ...a, ...b,
//         employee: { ...a.employee, ...b.employee },
//         client: { ...a.client, ...b.client },
//         location: { ...a.location, ...b.location }
//       }
//     })
//   }
// }

// function shiftInspectorAnalyticsFromStore(shift: Shift, state: RState): Promise<APIShiftInspector> {
//   const startTime = cloneOrCreateMo(shift.startTime)
//   // if no employee set the firstName and lastName to null
//   const employee = shift.employee ? getEmployeeById(state, shift.employee) : { firstName: null, lastName: null }
//   const client = getClientById(state, shift.location)
//   const location = getLocationById(state, shift.location)

//   const shiftAnalyticsFromStore: APIShiftInspector = {
//     id: shift.id,
//     date: startTime.format('MM/DD/YYYY'),
//     startTime: startTime.format('HH:MMA'),
//     endTime: startTime.clone().add(shift.duration, 'minutes').format('HH:MMA'),
//     duration: durationAsString(shift.duration),

//     employee: {
//       id: employee.id,
//       firstName: employee.firstName,
//       lastName: employee.lastName
//     },

//     client: {
//       id: client.id,
//       alias: client.alias
//     },

//     location: {
//       id: location.id,
//       alias: location.alias,
//       longitude: location.longitude,
//       latitude: location.latitude
//     }
//   }

//   return Promise.resolve(shiftAnalyticsFromStore)
// }

//   /**
//    * 
//    * GET /api/shift-analytics?employee=<ID>&client=<ID>&location=<ID>
//    * if employee id isnt included it will send back the availableEmployees
//    * body: {
//    *  employee: {
//    *    hoursScheduled,
//    *    shiftCount,
//    *    availableEmployees
//    *  },
//    *  client: {
//    *    hoursScheduled,
//    *    employeesScheduled
//    *  },
//    *  location: {
//    *    hoursScheduled,
//    *    employeesScheduled
//    *  }
//    * }
//    *
//    */

//   /**
//    * 
//    * GET FROM REDUX STORE:
//    * - date
//    * - startTime
//    * - endTime
//    * - duration
//    * 
//    * - employee.firstName
//    * - employee.lastName
//    * 
//    * - client.alias
//    * 
//    * - location.alias
//    * - location.longitude
//    * - location.latitude
//    * 
//    */
