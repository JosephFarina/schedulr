import { Entities, RState } from 'src/models'
import * as CRUD from 'src/modules/entityCrudFactories'

const raw: Entities<any> = {
  '0': {
    id: '0',
    alias: 'unedited'
  },
  '1': {
    id: '1',
    alias: 'unedited'
  },
  '2': {
    id: '2',
    alias: 'unedited'
  }
}

const added: Entities<any> = {
  '3': {
    id: '3',
    alias: 'unedited - added'
  }
}

const edited: Entities<any> = {
  '1': {
    id: '1',
    alias: 'edited'
  }
}

const deleted = ['2']

const state: RState = {
  entities: {
    clients: {
      raw,
      added,
      deleted,
      edited
    }
  }
}

const getRaw = (s: RState) => state.entities.clients.raw
const getAdded = (s: RState) => state.entities.clients.added
const getDeleted = (s: RState) => state.entities.clients.deleted
const getEdited = (s: RState) => state.entities.clients.edited

const getShifts = CRUD.getUpdatedEntitiesFactory(
  getRaw,
  getEdited,
  getAdded,
  getDeleted
)

describe('entityCrudFactorys: getEntitiesFactory', () => {
  it('it should replace edited shifts', () => {
    const res = getShifts(state)

    Object.keys(edited).forEach(key => {
      const editedShift = edited[key]
      expect(res).toContain(editedShift)
    })
  })

  it('should mix in newly added shifts', () => {
    const res = getShifts(state)
    Object.keys(added).forEach(key => {
      const addedShift = added[key]
      expect(res).toContain(addedShift)
    })
  })

  it('should remove the delete shifts', () => {
    const res = getShifts(state)
    const resIds = res.map(r => r.id)
    deleted.forEach(deletedId => {
      expect(resIds.indexOf(deletedId) < 0).toBeTruthy()
    })
  })

})
