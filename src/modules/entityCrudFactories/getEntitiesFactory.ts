import { createSelector } from 'reselect'
import { RState, Entities } from 'src/models'

export function getUpdatedEntitiesFactory(
  rawSelector: (a: RState) => Entities<any>,
  editedSelector: (a: RState) => Entities<any>,
  addedSelector: (a: RState) => Entities<any>,
  deletedSelector: (a: RState) => string[]
) {
  return createSelector(
    rawSelector,
    editedSelector,
    addedSelector,
    deletedSelector,
    (raw, edited, added, deleted) => {
      return getUpdatedEntities(raw, edited, added, deleted)
    }
  )
}

function getUpdatedEntities(raw: Entities<any>, edited: Entities<any>, added: Entities<any>, deleted: string[]) {
  const rawAddedEdited = Object.assign({}, raw, added, edited)

  return Object.keys(rawAddedEdited).reduce((res, entId) => {
    if (deleted.indexOf(entId) < 0) {
      return res.concat([rawAddedEdited[entId]])
    }

    return res
  }, [])
}
