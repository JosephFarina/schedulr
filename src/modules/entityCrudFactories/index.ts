/**
 * 
 * Crud Factories:
 * 
 * 1. Create all actions using the add, edit, and delete action Factories
 * 2. Merge entities action types with the crud ones
 * 3. merge entities initial state with the crud initial state
 * 4. merge reducer with crud reducer
 * 4. create selectors for each and then create getUpdatedEntitiesFactory 
 * 
 */


import * as Actions from './actionFactories'
import * as ActionTypes from './actionTypeFactory'
import * as InitialState from './initialStateFactory'
import * as Reducer from './reducerFactory'
import { getUpdatedEntitiesFactory } from './getEntitiesFactory'

export {
  Actions,
  ActionTypes,
  getUpdatedEntitiesFactory,
  InitialState,
  Reducer
}
