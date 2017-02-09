import configureStore, { IStore } from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares: any = [thunk]
const mockStore = configureStore(middlewares)

import * as A from './../action'
import shifts, { initialState } from './../reducer'
import { getAddedShifts } from './../selector'
import * as Models from 'src/models'
import { convertShiftObjectToArray } from 'src/utils'
const curry = require('ramda/src/curry')

function makeState(data): () => Models.RState {
  return () => ({
    shift: {
      data
    }
  })
}

function getFirstDispatchPayload(store: IStore<any>) {
  return store.getActions()[0].payload
}

describe('Shift State', () => {
  it('sanity check that it returns the correct initial state', () => {
    expect(shifts(undefined, { type: null, payload: null })).toEqual(initialState)
  })

  describe('Shift CRUD actions', () => {
    let shiftSetOne: Models.Shifts
    let shiftSetTwo: Models.Shifts
    let combinedShifts: Models.Shifts

    shiftSetOne = {
      'fffdfdfdf': {
        id: 'fffdfdfdf',
        duration: 34343,
        startTime: '4343434'
      }
    }

    shiftSetTwo = {
      asdfdf: {
        id: 'asdfdf',
        duration: 51334343,
        startTime: '12412433344343232'
      },
      555421443: {
        id: '555421443',
        duration: 5433111155,
        startTime: '512355545542'
      }
    }

    combinedShifts = Object.assign({}, shiftSetOne, shiftSetTwo)

    const testAdd = curry((
      makeState: (val: any) => Models.RState,
      setOne: Models.Entities<any>,
      setTwo: Models.Entities<any>,
      action,
      stateKey: string,
      removeOrAdd: 'remove' | 'add' | 'delete',
      del = false
    ) => {
      it(`#addNew should add added shifts to the state ${stateKey}`, () => {
        let combined = Object.assign({}, setOne, setTwo)

        let storeVal
        let expectedVal

        if (del) {
          setOne = Object.keys(setOne).sort()
          combined = Object.keys(combined).sort()
        }

        if (removeOrAdd === 'add') {
          storeVal = setOne
          expectedVal = combined
        } else if (removeOrAdd === 'remove') {
          storeVal = combined
          expectedVal = setOne
        }

        const store = mockStore(makeState({ [stateKey]: storeVal }))
        store.dispatch(action(convertShiftObjectToArray(setTwo)))
        expect(getFirstDispatchPayload(store)).toEqual(expectedVal)
      })
    })

    const testAddFactory = testAdd(makeState, shiftSetOne, shiftSetTwo)

    testAddFactory(A.addShifts, 'addedShifts', 'add')
    testAddFactory(A.removeAddedShifts, 'addedShifts', 'remove')

    testAddFactory(A.editShifts, 'editedShifts', 'add')
    testAddFactory(A.removeEditedShifts, 'editedShifts', 'remove')

    testAddFactory(A.deleteShifts, 'deletedShifts', 'add', true)
    testAddFactory(A.removeDeletedShifts, 'deletedShifts', 'remove', true)
  })

})
