import {
  RState,
  Entity
} from 'src/models'

import { curry, find, propEq } from 'ramda'

// TODO: make selector factory for raw, edited, added, and deleted

/**
 * Curried function 
 * provide it with an array of entites made by the getEntites selector 
 * then it will take an input and output a single entity
 */

export const getById = curry((entities: Entity[], id: string) => find(propEq('id', id))(entities))
export const getCount = curry((selector: (a: any) => any, state: RState) => selector(state).length)
