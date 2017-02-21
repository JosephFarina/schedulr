import { RState, EmployeeFavorabilies } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'

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

export const getEmployeeFavorabilities = Crud.getUpdatedEntitiesFactory(
  getRawEmployeeFavorabilies,
  getEditedEmployeeFavorabilies,
  getAddedEmployeeFavorabilies,
  getDeletedEmployeeFavorabilies
)
