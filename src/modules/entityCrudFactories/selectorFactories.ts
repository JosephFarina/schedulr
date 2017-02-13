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

export const getEntityById = curry((entities: Entity[], id: string) => find(propEq('id', id))(entities))

