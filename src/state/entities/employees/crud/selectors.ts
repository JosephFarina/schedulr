import { RState, Employees, Employee, EmployeeWithPosition } from 'src/models'
import { getPositionById } from './../../'
import * as Crud from 'src/modules/entityCrudFactories'

export const getEmployeeSearchValue = (state: RState) => state.entities.employees.crud.search
export const getEmployeeView = (state: RState) => state.entities.employees.crud.view

/**
 * 
 * Crud
 * 
 */

export const getRawEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.crud.raw)
export const getEditedEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.crud.edited)
export const getAddedEmployees = (state: RState): Employees => Object.assign({}, state.entities.employees.crud.added)
export const getDeletedEmployees = (state: RState): string[] => Object.assign([], state.entities.employees.crud.deleted)

/**
 * 
 * Get all Employee -- it gives updated version
 * 
 */

export const getEmployees = Crud.getUpdatedEntitiesFactory<Employee>(
  getRawEmployees,
  getEditedEmployees,
  getAddedEmployees,
  getDeletedEmployees
)

// todo: reselect me
export const getEmployeesWithPositions = (state: RState): EmployeeWithPosition[] => {
  return getEmployees(state).map(emp => {
    const positionId = typeof emp.position === 'string' ? emp.position : null

    return Object.assign({}, emp, {
      position: getPositionById(state, positionId)
    })
  })
}

export const getEmployeeById = (state: RState, id: string) => Crud.Selectors.getById(getEmployees(state))(id)
export const getEmployeeCount = Crud.Selectors.getCount(getEmployees)
