import {
  Clients,
  Employees,
  Locations,
  SelectOption,
  SelectOptions,
} from 'src/models'

export function convertEntityToSelectOptions(entity: Clients | Employees | Locations): SelectOptions {
  return Object.keys(entity).map(clientId => ({ value: clientId, display: entity[clientId].alias }))
}
