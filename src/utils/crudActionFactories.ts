const curry = require('ramda/src/curry')
const union = require('lodash.union')

import {
  RState,
  Entity,
  Entities
} from 'src/models'

import { convertEntityArrToObj, deleteKeysFromObject } from 'src/utils'


/**
 * 
 * CRUD OPERATIONS FOR SHIFTS
 * 
 * note:
 * they do all the handy work so in the reducer you only need to set the variable you want updated to the action.payload
 * 
 *    
 * Ex: 
 *   case Type.ThatWasSupplied:
 *   return Object.assign({}, state, {
 *    [someKeyThatIsBeingUpdated]: action.payload
 *   })
 * 
 */


export const addEntitiesActionFactory = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
  (dispatch, getState) => {
    dispatch({
      type,
      payload: Object.assign({}, selector(getState()), convertEntityArrToObj(entities))
    })
  }
)

export const removeAddedEntitiesActionFactory = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
  (dispatch, getState) => {
    const added = selector(getState())
    const idsToDelete = entities.map(entity => entity.id)
    dispatch({ type, payload: deleteKeysFromObject(idsToDelete, added) })
  }
)

export const deleteEntitiesActionFactory = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
  (dispatch, getState) => {
    dispatch({ type, payload: union(entities.map(entity => entity.id), selector(getState())) })
  }
)

export const removeDeletedEntitiesActionFactory = curry((type, selector: (state: RState), entities: Entity[]) =>
  (dispatch, getState) => {
    const idsToUndelete = entities.map(entity => entity.id)
    dispatch({
      type,
      payload: selector(getState()).filter(id => idsToUndelete.indexOf(id) < 0)
    })
  }
)
