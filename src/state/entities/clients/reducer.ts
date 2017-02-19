import * as Crud from 'src/modules/entityCrudFactories'
import { Action, Client, Clients } from 'src/models'
import { ClientEntityActions } from 'src/state/actionTypes'

export const initialState = Crud.InitialState.mergeWith({

})

const clientsReducer = (state = initialState, action: Action<Clients>) => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(ClientEntityActions, clientsReducer)
