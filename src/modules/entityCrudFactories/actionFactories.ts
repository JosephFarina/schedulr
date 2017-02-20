const union = require('lodash.union')
import { curry, merge, map } from 'ramda'

import {
  RState,
  Entity,
  Entities
} from 'src/models'

import * as Crud from './'

import { convertEntityArrToObj, deleteKeysFromObject } from 'src/utils'


declare type a = {
  default: (state: RState) => Entities<any>,
  raw: (state: RState) => Entities<any>,
}

/*
  selector:(state: RState) => Entities<any> | {
    default?: (state: RState) => Entities<any>,
    raw?: (state: RState) => Entities<any>,
  }
*/

export const actionFactory = curry(function actionFactory(
  types: Crud.ActionTypes.CrudActionTypes,
  selector: any,
  option: Crud.ActionTypes.ActionOptions,
) {
  return (input: Entity[] | Entities<any>) => (dispatch, getState) => {
    dispatch({
      type: types[option],
      payload: getPayload(option, selector, getState(), input)
    })
  }
})

function getPayload(option: Crud.ActionTypes.ActionOptions, selector: any, state: RState, input: Entity[] | Entities<any>) {
  switch (option) {

    case 'setRaw':
      return Object.assign({}, input)

    case 'add':
      return Object.assign({}, selector(state), convertEntityArrToObj((<Entity[]> input)))

    case 'edit':
      console.log(selector)
      const mergedWithState = (<Entity[]> input).map(inputEnt => {
        const stateEnt = selector.raw(state)[inputEnt.id] || {}
        return merge(stateEnt, inputEnt)
      })

      return merge(selector.default(state), convertEntityArrToObj(mergedWithState))

    case 'removeEdited':
      return deleteKeysFromObject((<Entity[]> input).map(x => x.id), selector.default(state))

    case 'removeAdded':
       return deleteKeysFromObject((<Entity[]> input).map(x => x.id), selector(state))

    case 'delete':
      return union((<Entity[]> input).map(x => x.id), selector(state))

    case 'removeDeleted':
      const idsToRemove = (<Entity[]> input).map(x => x.id)
      return (<string[]> selector(state)).filter(id => !~idsToRemove.indexOf(id))

    default:
      throw new Error('Cant find the type given in the action factory')
  }
}
