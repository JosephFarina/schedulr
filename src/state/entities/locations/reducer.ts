import * as Crud from 'src/modules/entityCrudFactories'
import { Action, Locations } from 'src/models'
import { LocationEntityActions } from 'src/state/actionTypes'

export const initialState = Crud.InitialState.mergeWith({

})

const locationsReducer = (state = initialState, action: Action<Locations>) => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(LocationEntityActions, locationsReducer)
