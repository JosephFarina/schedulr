import { RState, Locations, Location } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'


export const getRawLocations = (state: RState): Locations => Object.assign({}, state.entities.employees.raw)
export const getEditedLocations = (state: RState): Locations => Object.assign({}, state.entities.employees.edited)
export const getAddedLocations = (state: RState): Locations => Object.assign({}, state.entities.employees.added)
export const getDeletedLocations = (state: RState): string[] => Object.assign([], state.entities.employees.deleted)

/**
 * 
 * Get all Locations -- it gives updated version
 * 
 */

export const getLocations = Crud.getUpdatedEntitiesFactory(
  getRawLocations,
  getEditedLocations,
  getAddedLocations,
  getDeletedLocations
)

export const getLocationsById = (state: RState, id: string): Location => getLocations(state)[id]
