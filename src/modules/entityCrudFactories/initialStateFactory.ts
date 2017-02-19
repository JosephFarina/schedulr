import { checkForOverlappingKeys } from 'src/utils'
import { CrudState } from 'src/models'

const initialCrudState: CrudState<any> = {
  raw: {},
  added: {},
  edited: {},
  deleted: []
}

export function mergeWith<E, T>(initialState): CrudState<E> & T {
  checkForOverlappingKeys(initialState, initialCrudState)
  return Object.assign({}, initialCrudState, initialState)
}
