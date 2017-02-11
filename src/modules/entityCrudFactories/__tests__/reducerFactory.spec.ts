import * as Crud from './../'
import { CrudState } from 'src/models'


interface initialState extends CrudState<any> {
  hello: string
}

const initialState: initialState = {
  hello: 'hello',
  added: {},
  deleted: [],
  edited: {},
  raw: {}
}

const ACTION_TYPE_1 = 'ACTION_TYPE_1'
const ACTION_TYPE_1_RETURN = {
  'returning': 'from action type 1'
}

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE_1:
      return ACTION_TYPE_1_RETURN

    default:
      return state
  }
}


interface TestActionTypes {
  test: string
}

const actions: TestActionTypes = { test: 'test' }
const crudActionTypes = Crud.ActionTypes.mergeWith<TestActionTypes>('TEST', actions)
const crudReducer = Crud.Reducer.mergeWith<initialState>(crudActionTypes, testReducer)

describe('entityCrudFactory: reducerfactory', () => {

  it('should return initial state of input reducer when no actions match', () => {
    const res = crudReducer(undefined, { type: '', payload: null })
    expect(res).toEqual(initialState)
  })

  it('should return the correct action val for the given reducer', () => {
    const res = crudReducer(undefined, { type: ACTION_TYPE_1, payload: null })
    expect(res).toEqual(ACTION_TYPE_1_RETURN)
  })

  describe('crud reducer actions', () => {
    let payload
    beforeEach(() => {
      payload = Math.random() * 500
    })

    it('add', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.add, payload })
      expect(res.added).toEqual(payload)
    })

    it('removeAdded', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.removeAdd, payload })
      expect(res.added).toEqual(payload)
    })

    it('edit', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.edit, payload })
      expect(res.edited).toEqual(payload)
    })

    it('removeEdited', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.removeEdit, payload })
      expect(res.edited).toEqual(payload)
    })

    it('delete', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.delete, payload })
      expect(res.deleted).toEqual(payload)
    })

    it('removeDeleted', () => {
      const res = crudReducer(undefined, { type: crudActionTypes.removeDelete, payload })
      expect(res.deleted).toEqual(payload)
    })
  })

})
