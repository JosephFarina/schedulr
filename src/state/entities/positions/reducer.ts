import * as Crud from 'src/modules/entityCrudFactories'
import { Action, Positions } from 'src/models'
import { PositionEntityActions } from 'src/state/actionTypes'

export const initialState = Crud.InitialState.mergeWith({

})

const positionsReducer = (state = initialState, action: Action<Positions>) => {
  switch (action.type) {

    default:
      return state
  }
}

export default Crud.Reducer.mergeWith(PositionEntityActions, positionsReducer)
