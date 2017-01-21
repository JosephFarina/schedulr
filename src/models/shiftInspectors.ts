import {
  Client,
  Employee,
  Location,
  Shift
} from 'src/models'

export interface InspectorBreakdown<T> {
  totalDuration?: number
  shifts?: Shift[]
  entity?: T
}

export interface GeneralInspector {
  totalDuration?: number
  shifts?: Shift[]
  breakdown?: {
    employees?: InspectorBreakdown<Employee>[]
    locations?: InspectorBreakdown<Location>[]
    clients?: InspectorBreakdown<Client>[]
  }
}












/*

 9/15/2015

 90 Total Hours Scheduled
 52 Shifts Scheduled

 // EMPLOYEES -- collapsable
  -employee name[]:
    -15 total shifts
    -30 total hours
 // CLIENTS -- collapsable
  -client name[]:
    -14 total shifst
    -35 total hours
 // LOCATIONS -- collapsable

 */
//
// export interface GeneralInspector {
//
//   startTime?:Moment
//   endTime?:Moment
//
//   cumulativeHours?:{
//     [employeeId:string]:number
//   }
//
//   hours?:{
//     employees:{
//       cumulativeHours:number
//       employee:Employee
//     }[]
//     clients:{
//       cumulativeHours:number
//       client:Client
//     }[]
//     locations:{
//       cumulativeHours:number
//       location:Location
//     }[]
//   }
//
//   totalShift?:number
//
//   // shifts?: Shift[]
//   // employees?: Employee[]
//   // clients?: Client[]
//   // locations?: Location[]
// }
