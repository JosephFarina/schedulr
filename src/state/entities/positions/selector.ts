import { RState, Positions } from 'src/models'
import * as Crud from 'src/modules/entityCrudFactories'


export const getRawPositions = (state: RState): Positions => Object.assign({}, state.entities.positions.raw)
export const getEditedPositions = (state: RState): Positions => Object.assign({}, state.entities.positions.edited)
export const getAddedPositions = (state: RState): Positions => Object.assign({}, state.entities.positions.added)
export const getDeletedPositions = (state: RState): string[] => Object.assign([], state.entities.positions.deleted)
export const getPositions = Crud.getUpdatedEntitiesFactory(
  getRawPositions,
  getEditedPositions,
  getAddedPositions,
  getDeletedPositions
)
export const getPositionById = (state: RState, id: string) => Crud.Selectors.getById(getPositions(state))(id)
