import * as Crud from '../'

import { curry, values, keys } from 'ramda'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RState, Clients, Entities, CrudState } from 'src/models'
import {
  getFirstDispatchPayload,
  CLIENTS,
  CLIENTS_TWO
} from 'src/testUtils'

const middlewares: any = [thunk]
const mockStore = configureStore(middlewares)


interface TestDataSets {
  storeVal: any, actionVal: any, expectedVal: any
}

const getDataSets = curry(function getDataSets(setOne, setTwo, addOrDelete: 'add' | 'remove'): TestDataSets {
  const combined = Object.assign({}, setOne, setTwo)

  if (addOrDelete === 'add') {
    return {
      storeVal: Object.assign({}, setOne),
      actionVal: values(Object.assign({}, setTwo)),
      expectedVal: combined
    }
  } else if (addOrDelete === 'remove') {
    return {
      storeVal: combined,
      actionVal: values(Object.assign({}, setTwo)),
      expectedVal: Object.assign({}, setOne)
    }
  }
})

const dataGenerator = getDataSets(CLIENTS, CLIENTS_TWO)

function makeState(clients: Partial<CrudState<Clients>>): RState {
  return {
    entities: {
      clients: <any> clients
    }
  }
}

const getRawClients = (state: RState): Entities<Clients> => state.entities.clients.raw
const getEditedClients = (state: RState): Entities<Clients> => state.entities.clients.edited
const getAddedClients = (state: RState): Entities<Clients> => state.entities.clients.added
const getDeletedClients = (state: RState): string[] => state.entities.clients.deleted

function testPayloadIsCorrect(state, action, expected) {
  const store = mockStore(state)
  store.dispatch(action)
  let firstAction = getFirstDispatchPayload(store)

  if (Array.isArray(firstAction)) {
    firstAction = firstAction.sort()
  }

  expect(firstAction).toEqual(expected)
}

const actionTypes = Crud.ActionTypes.mergeWith('TestClient', {})
const testActionFactory = Crud.Actions.actionFactory(actionTypes)


describe('entityCrudFactories: actionFactories', () => {
  const addActions = testActionFactory(getAddedClients)
  const editActions = testActionFactory({
    default: getEditedClients,
    raw: getRawClients
  })
  const deleteActions = testActionFactory(getDeletedClients)
  const rawActions = testActionFactory(getRawClients)

  it('add should add entities', () => {
    const {actionVal, expectedVal, storeVal} = dataGenerator('add')
    testPayloadIsCorrect(
      makeState({ added: storeVal }),
      addActions('add')(actionVal),
      expectedVal
    )
  })

  it('removeAdded should remove added entities', () => {
    const {actionVal, expectedVal, storeVal } = dataGenerator('remove')
    testPayloadIsCorrect(
      makeState({ added: storeVal }),
      addActions('removeAdded')(actionVal),
      expectedVal
    )
  })

  describe('edit', () => {
    it('should add entities to edit', () => {
      const {actionVal, expectedVal, storeVal} = dataGenerator('add')

      testPayloadIsCorrect(
        makeState({ edited: storeVal, raw: {} }),
        editActions('edit')(actionVal),
        expectedVal
      )
    })

    it('should accept partial objects and merge into exisiting id', () => {
      const editedClientId = Object.keys(CLIENTS)[0]
      const editedAliasVal = 'this is a new val'
      const storeVal = { [editedClientId]: { ...CLIENTS[editedClientId] } }
      const actionVal = [{
        id: editedClientId,
        alias: editedAliasVal
      }]
      const expectedVal: Clients = { [editedClientId]: { ...storeVal[editedClientId] } }
      expectedVal[editedClientId].alias = editedAliasVal

      testPayloadIsCorrect(
        makeState({ raw: storeVal, edited: {} }),
        editActions('edit')(actionVal),
        expectedVal
      )
    })
  })


  it('removeEdited should remove entities from the edited', () => {
    const {actionVal, expectedVal, storeVal} = dataGenerator('remove')
    testPayloadIsCorrect(
      makeState({ edited: storeVal }),
      editActions('removeEdited')(actionVal),
      expectedVal
    )
  })

  it('delete should add ids to the delete array', () => {
    const {actionVal, expectedVal, storeVal} = dataGenerator('add')
    testPayloadIsCorrect(
      makeState({ deleted: keys(storeVal) }),
      deleteActions('delete')(actionVal),
      keys(expectedVal).sort()
    )
  })

  it('removeDeleted should remove the deleted id from the array', () => {
    const {actionVal, expectedVal, storeVal} = dataGenerator('remove')
    testPayloadIsCorrect(
      makeState({ deleted: keys(storeVal) }),
      deleteActions('removeDeleted')(actionVal),
      keys(expectedVal).sort()
    )
  })

  it('setRaw should set the raw entities', () => {
    const store = mockStore(makeState({ raw: {} }))

    store.dispatch(rawActions('setRaw')(CLIENTS))
    expect(getFirstDispatchPayload(store)).toEqual(CLIENTS)
  })

})
