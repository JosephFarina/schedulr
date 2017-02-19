import { RState, Locations, Location } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'


export const getRawLocations = (state: RState): Locations => Object.assign({}, state.entities.locations.raw)
export const getEditedLocations = (state: RState): Locations => Object.assign({}, state.entities.locations.edited)
export const getAddedLocations = (state: RState): Locations => Object.assign({}, state.entities.locations.added)
export const getDeletedLocations = (state: RState): string[] => Object.assign([], state.entities.locations.deleted)

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

export const getLocationById = (state: RState, id: string) => Crud.Selectors.getById(getLocations(state))(id)
