import { ClientEntityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedClients,
  getDeletedClients,
  getEditedClients,
  getRawClients
} from './'

/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 */

const actionFactory = Crud.Actions.actionFactory(ClientEntityActions)

const rawFactory = actionFactory(getRawClients)
export const setClients = rawFactory('setRaw')

const addFactory = actionFactory(getAddedClients)
export const addClients = addFactory('add')
export const removeAddedClients = addFactory('removeAdded')

const editFactory = actionFactory(getEditedClients)
export const editClients = editFactory('edit')
export const removeEditedClients = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedClients)
export const deleteClients = deleteFactory('delete')
export const removeDeletedClients = deleteFactory('removeDeleted')
