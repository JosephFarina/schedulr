import { RState, EmployeeFavorabilies, EmployeeFavorability, UnnormalizedEmployeeFavorability } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'
import { getEmployeeById, getClientById } from 'src/state/entities'

export const getRawEmployeeFavorabilies =
  (state: RState): EmployeeFavorabilies => Object.assign({}, state.entities.employeeFavorability.raw)

export const getEditedEmployeeFavorabilies =
  (state: RState): EmployeeFavorabilies => Object.assign({}, state.entities.employeeFavorability.edited)

export const getAddedEmployeeFavorabilies =
  (state: RState): EmployeeFavorabilies => Object.assign({}, state.entities.employeeFavorability.added)

export const getDeletedEmployeeFavorabilies =
  (state: RState): string[] => Object.assign([], state.entities.employeeFavorability.deleted)

/**
 * 
 * Get all EmployeeFavorabilities -- it gives updated version
 * 
 */

export const getEmployeeFavorabilities = Crud.getUpdatedEntitiesFactory<EmployeeFavorability>(
  getRawEmployeeFavorabilies,
  getEditedEmployeeFavorabilies,
  getAddedEmployeeFavorabilies,
  getDeletedEmployeeFavorabilies
)

/**
 * 
 * 
 */

export const getEmployeeFavorabilitiesByEmployeeId = (state: RState, id: string): UnnormalizedEmployeeFavorability[] => {
  return getEmployeeFavorabilities(state)
    .filter(empFav => empFav.employee === id)
    .map(unnormalizeEmployeeFavorability(state))
}

export const getEmployeeFavorabilitiesByClientId = (state: RState, id: string): UnnormalizedEmployeeFavorability[] => {
  return getEmployeeFavorabilities(state)
    .filter(empFav => empFav.client === id)
    .map(unnormalizeEmployeeFavorability(state))
}

function unnormalizeEmployeeFavorability(state: RState) {
  return (empFav: EmployeeFavorability): UnnormalizedEmployeeFavorability => {
    const {client, employee} = empFav
    return {
      ...empFav,
      client: getClientById(state, client),
      employee: getEmployeeById(state, employee),
    }
  }
}
