import { PositionEntityActions } from 'src/state/actionTypes'
import * as Crud from 'src/modules/entityCrudFactories'

import {
  getAddedPositions,
  getDeletedPositions,
  getRawPositions,
  getEditedPositions
} from './'

const actionFactory = Crud.Actions.actionFactory(PositionEntityActions)

const rawFactory = actionFactory(getRawPositions)
export const setPositions = rawFactory('setRaw')

const addFactory = actionFactory(getAddedPositions)
export const addPositions = addFactory('add')
export const removeAddedPositions = addFactory('removeAdded')

const editFactory = actionFactory(getEditedPositions)
export const editPositions = editFactory('edit')
export const removeEditedPositions = editFactory('removeEdited')

const deleteFactory = actionFactory(getDeletedPositions)
export const deletePositions = deleteFactory('delete')
export const removeDeletedPositions = deleteFactory('removeDeleted')
