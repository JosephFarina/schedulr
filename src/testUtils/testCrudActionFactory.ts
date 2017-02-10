import { curry } from 'ramda'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RState, Entities } from 'src/models'
import { getFirstDispatchPayload } from 'src/testUtils'
import { convertShiftObjectToArray } from 'src/utils'

const middlewares: any = [thunk]
const mockStore = configureStore(middlewares)

export const testCrudActionFactory = curry((
  makeState: (val: any) => RState,
  setOne: Entities<any>,
  setTwo: Entities<any>,
  action,
  stateKey: string,
  removeOrAdd: 'remove' | 'add' | 'dRemove' | 'dAdd',
) => {
  it(`#${removeOrAdd} should add added shifts to the state ${stateKey}`, () => {
    let combined = Object.assign({}, setOne, setTwo)

    let storeVal
    let expectedVal

    // if where testing the delete function turn the expected and state into [id]
    if (removeOrAdd === 'dRemove' || removeOrAdd === 'dAdd') {
      setOne = Object.keys(setOne).sort()
      combined = Object.keys(combined).sort()
    }

    if (removeOrAdd === 'add' || removeOrAdd === 'dAdd') {
      storeVal = setOne
      expectedVal = combined
    } else if (removeOrAdd === 'remove' || removeOrAdd === 'dRemove') {
      storeVal = combined
      expectedVal = setOne
    }

    const store = mockStore(makeState({ [stateKey]: storeVal }))
    store.dispatch(action(convertShiftObjectToArray(setTwo)))
    expect(getFirstDispatchPayload(store)).toEqual(expectedVal)
  })
})