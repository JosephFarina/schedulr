const union = require('lodash.union')
import { curry } from 'ramda'

import {
  RState,
  Entity,
  Entities
} from 'src/models'

import * as Crud from './'

import { convertEntityArrToObj, deleteKeysFromObject } from 'src/utils'

export const actionFactory = curry(function actionFactory(
  types: Crud.ActionTypes.CrudActionTypes,
  selector: (state: RState) => Entities<any>,
  option: Crud.ActionTypes.ActionOptions,
  input: Entity[] | Entities<any>
) {
  return (dispatch, getState) => {
    dispatch({
      type: types[option],
      payload: getPayload(option, selector(getState()), input)
    })
  }
})

function getPayload(option: Crud.ActionTypes.ActionOptions, stateSlice: Entities<any> | string[], input: Entity[] | Entities<any>) {
  switch (option) {

    case 'setRaw':
      return Object.assign({}, input)

    case 'add':
    case 'edit':
      return Object.assign({}, stateSlice, convertEntityArrToObj((<Entity[]> input)))

    case 'removeAdded':
    case 'removeEdited':
      return deleteKeysFromObject((<Entity[]> input).map(x => x.id), stateSlice)

    case 'delete':
      return union((<Entity[]> input).map(x => x.id), stateSlice)

    case 'removeDeleted':
      const idsToRemove = (<Entity[]> input).map(x => x.id)
      return (<string[]> stateSlice).filter(id => !~idsToRemove.indexOf(id))

    default:
      throw new Error('Cant find the type given in the action factory')
  }
}
