import { checkForOverlappingKeys } from 'src/utils'
import { RCrud } from 'src/models'

const initialCrudState: RCrud = {
  added: {},
  edited: {},
}

export function mergeCrudInitialStateWith(initialState) {
  checkForOverlappingKeys(initialState, initialCrudState)
  return Object.assign({}, initialCrudState, initialState)
}
