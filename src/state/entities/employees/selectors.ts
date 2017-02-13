import { RState, Employees, Employee } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'


export const getRawEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.raw)
export const getEditedEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.edited)
export const getAddedEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.added)
export const getDeletedEmployees = (state: RState): string[] => Object.assign([], state.entities.employees.deleted)

/**
 * 
 * Get all Employee -- it gives updated version
 * 
 */

export const getEmployees = Crud.getUpdatedEntitiesFactory(
  getRawEmployees,
  getEditedEmployees,
  getAddedEmployees,
  getDeletedEmployees
)

export const getEmployeeById = (state: RState, id: string) => Crud.Selectors.getEntityById(getEmployees(state))(id)
