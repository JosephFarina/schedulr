const union = require('lodash.union')
import { curry } from 'ramda'

import {
  RState,
  Entity,
  Entities
} from 'src/models'

import * as Crud from './'

import { convertEntityArrToObj, deleteKeysFromObject } from 'src/utils'

declare type actionOptions = 'add' | 'removeAdded' | 'edit' | 'removeEdited' | 'delete' | 'removeDeleted'

export const actionFactory = curry(function actionFactory(
  types: Crud.ActionTypes.CrudActionTypes,
  selector: (state: RState) => Entities<any>,
  option: actionOptions,
  input: Entity[]
) {
  return (dispatch, getState) => {
    dispatch({
      type: types[option],
      payload: getPayload(option, selector(getState()), input)
    })
  }
})

function getPayload(option: actionOptions, stateSlice: Entities<any> | string[], input: Entity[]) {
  switch (option) {

    case 'add':
    case 'edit':
      return Object.assign({}, stateSlice, convertEntityArrToObj(input))

    case 'removeAdded':
    case 'removeEdited':
      return deleteKeysFromObject(input.map(x => x.id), stateSlice)

    case 'delete':
      return union(input.map(x => x.id), stateSlice)

    case 'removeDeleted':
      const idsToRemove = input.map(x => x.id)
      return (<string[]> stateSlice).filter(id => !~idsToRemove.indexOf(id))

    default:
      throw new Error('Cant find the type given in the action factory')
  }
}











// export const addEntity = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
//   (dispatch, getState) => {
//     dispatch({
//       type,
//       payload: Object.assign({}, selector(getState()), convertEntityArrToObj(entities))
//     })
//   }
// )

// export const removeAddedEntity = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
//   (dispatch, getState) => {
//     const added = selector(getState())
//     const idsToDelete = entities.map(entity => entity.id)
//     dispatch({ type, payload: deleteKeysFromObject(idsToDelete, added) })
//   }
// )

// export const deleteEntity = curry((type, selector: (state: RState) => Entities<any>, entities: Entity[]) =>
//   (dispatch, getState) => {
//     dispatch({ type, payload: union(entities.map(entity => entity.id), selector(getState())) })
//   }
// )

// export const removeDeletedEntity = curry((type, selector: (state: RState) => string[], entities: Entity[]) =>
//   (dispatch, getState) => {
//     const idsToUndelete = entities.map(entity => entity.id)
//     dispatch({
//       type,
//       payload: selector(getState()).filter(id => idsToUndelete.indexOf(id) < 0)
//     })
//   }
// )
