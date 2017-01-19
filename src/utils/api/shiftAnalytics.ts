// import {
//   APIShiftInspector,
//   Shift
// } from 'src/models'

// import { employeesOneArray } from 'src/testUtils'

// // if employee id isnt included it will send back the availableEmployees
// export function shiftAnalytics({ client, location, employee }: Shift): Promise<APIShiftInspector> {
//   const url = `/api/shift-analytics?client=${client}&location=${location}${employee ? '&employee=employeeId' : ''}`

//   return Promise.resolve({
//     employee: {
//       hoursScheduled: 15,
//       shiftCount: 50
//     },
//     client: {
//       hoursSchedule: 14,
//       employeesScheduled: employeesOneArray
//     },
//     location: {
//       hoursScheduled: 23,
//       employeesScheduled: employeesOneArray
//     }
//   })
// }
