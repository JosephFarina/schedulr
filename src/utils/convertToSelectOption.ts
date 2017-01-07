import {
  Clients,
  Employees,
  Locations,
  SelectOption,
  SelectOptions,
} from 'src/models'

export function clients(clients: Clients): SelectOptions {
  return Object.keys(clients).map(client => ({ value: '', display: '' }))
}
