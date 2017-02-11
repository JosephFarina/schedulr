import * as Crud from '../'

import { curry, values, keys } from 'ramda'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RState, Clients, Entities, CrudState } from 'src/models'
import {
  getFirstDispatchPayload,
  clientsOne,
  clientsTwo
} from 'src/testUtils'
import { convertEntityObjectToArray } from 'src/utils'

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

const dataGenerator = getDataSets(clientsOne, clientsTwo)

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
  const editActions = testActionFactory(getEditedClients)
  const deleteActions = testActionFactory(getDeletedClients)

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

  it('edit should add entities to edit', () => {
    const {actionVal, expectedVal, storeVal} = dataGenerator('add')
    testPayloadIsCorrect(
      makeState({ edited: storeVal }),
      editActions('edit')(actionVal),
      expectedVal
    )
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

})



// ort const testCrudActionFactory = curry((
//   makeState: (val: any) => RState,
//   setOne: Entities<any>,
//   setTwo: Entities<any>,
//   action,
//   removeOrAdd: 'remove' | 'add' | 'dRemove' | 'dAdd' | 'edit' | 'dEdit',
// ) => {
//   it(`#${removeOrAdd} should add added shifts to the state ${removeOrAdd}`, () => {
//     let combined = Object.assign({}, setOne, setTwo)

//     let storeVal
//     let expectedVal

//     let stateKey
//     if (removeOrAdd === 'remove' || removeOrAdd === 'dRemove') {
//       stateKey = 'deleted'
//     } else if (removeOrAdd === 'add' || removeOrAdd === 'dAdd') {
//       stateKey = 'added'
//     } else if (removeOrAdd === 'edit' || removeOrAdd === 'dEdit') {
//       stateKey = 'edited'
//     }


//     // if where testing the delete function turn the expected and state into [id]
//     if (removeOrAdd === 'dRemove' || removeOrAdd === 'dAdd') {
//       setOne = Object.keys(setOne).sort()
//       combined = Object.keys(combined).sort()
//     }

//     if (removeOrAdd === 'add' || removeOrAdd === 'edit' || removeOrAdd === 'remove') {
//       storeVal = setOne
//       expectedVal = combined
//     } else if (removeOrAdd === 'dRemove' || removeOrAdd === 'dAdd' || removeOrAdd === 'dEdit') {
//       storeVal = combined
//       expectedVal = setOne
//     }

//     const store = mockStore(makeState({ [stateKey]: storeVal }))
//     store.dispatch(action(convertShiftObjectToArray(setTwo)))
//     expect(getFirstDispatchPayload(store)).toEqual(expectedVal)
//   })
// })