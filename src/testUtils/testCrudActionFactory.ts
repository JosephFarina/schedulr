import { curry } from 'ramda'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RState, Entities } from 'src/models'
import { getFirstDispatchPayload } from 'src/testUtils'
import { convertEntityObjectToArray } from 'src/utils'

const middlewares: any = [thunk]
const mockStore = configureStore(middlewares)

export const testCrudActionFactory = curry((
  makeState: (val: any) => RState,
  setOne: Entities<any>,
  setTwo: Entities<any>,
  action,
  removeOrAdd: 'remove' | 'add' | 'dRemove' | 'dAdd' | 'edit' | 'dEdit',
) => {
  it(`#${removeOrAdd} should add added shifts to the state ${removeOrAdd}`, () => {
    let combined = Object.assign({}, setOne, setTwo)

    let storeVal
    let expectedVal

    let stateKey
    if (removeOrAdd === 'remove' || removeOrAdd === 'dRemove') {
      stateKey = 'deleted'
    } else if (removeOrAdd === 'add' || removeOrAdd === 'dAdd') {
      stateKey = 'added'
    } else if (removeOrAdd === 'edit' || removeOrAdd === 'dEdit') {
      stateKey = 'edited'
    }


    // if where testing the delete function turn the expected and state into [id]
    if (removeOrAdd === 'dRemove' || removeOrAdd === 'dAdd') {
      setOne = Object.keys(setOne).sort()
      combined = Object.keys(combined).sort()
    }

    if (removeOrAdd === 'add' || removeOrAdd === 'edit' || removeOrAdd === 'remove') {
      storeVal = setOne
      expectedVal = combined
    } else if (removeOrAdd === 'dRemove' || removeOrAdd === 'dAdd' || removeOrAdd === 'dEdit') {
      storeVal = combined
      expectedVal = setOne
    }

    const store = mockStore(makeState({ [stateKey]: storeVal }))
    store.dispatch(action(convertEntityObjectToArray(setTwo)))
    expect(getFirstDispatchPayload(store)).toEqual(expectedVal)
  })
})