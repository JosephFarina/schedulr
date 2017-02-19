import { RState, Clients, Client } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'

import { find, propEq } from 'ramda'

export const getRawClients = (state: RState): Clients => Object.assign({}, state.entities.clients.raw)
export const getEditedClients = (state: RState): Clients => Object.assign({}, state.entities.clients.edited)
export const getAddedClients = (state: RState): Clients => Object.assign({}, state.entities.clients.added)
export const getDeletedClients = (state: RState): string[] => Object.assign([], state.entities.clients.deleted)

/**
 * 
 * Get all Clients -- it gives updated version
 * 
 */

export const getClients = Crud.getUpdatedEntitiesFactory(
  getRawClients,
  getEditedClients,
  getAddedClients,
  getDeletedClients
)

export const getClientById = (state: RState, id: string) => Crud.Selectors.getById(getClients(state))(id)
