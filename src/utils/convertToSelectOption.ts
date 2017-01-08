import {
  Client,
  Clients,
  Employee,
  Employees,
  Location,
  Locations,
  SelectOption,
  SelectOptions,
} from 'src/models'

import {
  isArray
} from 'src/utils'

/**
 * 
 * Accepts any type of entity in either object storage form or in array format
 * 
 */

declare type Entity = Clients | Employees | Locations
declare type EntityArray = Client[] | Employee[] | Location[]

export function convertEntityToSelectOptions(
  entity: Entity | EntityArray,
  idsToFilterOut: string[] = []
): SelectOptions {

  if (isArray(entity)) {
    return (<any[]>entity).map((e: Client | Location | Employee) => ({ value: e.id, display: e.alias }))
  } else {
    return Object.keys(entity)
      .filter(entityId => idsToFilterOut.indexOf(entityId) < 0)
      .map(entityId => ({ value: entityId, display: entity[entityId].alias }))
  }
}


    // TODO:
    // make this able to also take in Client employee or location array
    // then in shift editor i can for SelectedEmployeeIds go
    // const chipOptions = selectedEmployeeIds.map(id => {
    // const employee = employees[id]
    // return {value: employee.id, display: employee.alias}
    // })
