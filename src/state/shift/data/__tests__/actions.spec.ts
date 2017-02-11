import * as A from './../action'
import shifts, { initialState } from './../reducer'
import { RState, Shifts } from 'src/models'
import { testCrudActionFactory } from 'src/testUtils'

function makeState(data): () => RState {
  return () => ({
    shift: { data }
  })
}

describe('Shift State', () => {
  it('sanity check that it returns the correct initial state', () => {
    expect(shifts(undefined, { type: null, payload: null })).toEqual(initialState)
  })

  describe('Shift CRUD actions', () => {
    const shiftSetOne: Shifts = {
      'fffdfdfdf': {
        id: 'fffdfdfdf',
        duration: 34343,
        startTime: '4343434'
      }
    }
    const shiftSetTwo: Shifts = {
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

    // const testAddFactory = testCrudActionFactory(makeState, shiftSetOne, shiftSetTwo)

    // testAddFactory(A.addShifts, 'add')
    // testAddFactory(A.removeAddedShifts, 'remove')

    // testAddFactory(A.editShifts, 'edit')
    // testAddFactory(A.removeEditedShifts, 'dEdit')

    // testAddFactory(A.deleteShifts, 'dAdd')
    // testAddFactory(A.removeDeletedShifts, 'dRemove')
  })

})
