import configureStore from 'redux-mock-store'

const middlewares: any = []
const mockStore = configureStore(middlewares)

import * as Actions from './../action'
import shifts, { initialState } from './../reducer'
import * as Selectors from './../selector'
import * as Models from 'src/models'
import { convertShiftObjectToArray } from 'src/utils'

function makeShiftState(data): () => Models.RState {
  return () => ({
    shift: {
      data
    }
  })
}

describe('Shift State', () => {
  it('sanity check that it returns the correct initial state', () => {
    expect(shifts(undefined, { type: null, payload: null })).toEqual(initialState)
  })

  describe('Shift CRUD actions', () => {
    let shiftSetOne: Models.Shifts
    let shiftSetTwo: Models.Shifts
    let combinedShifts: Models.Shifts
    let dispatch

    beforeEach(() => {
      dispatch = jasmine.createSpy('dispatch')
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
    })

    it('#addShifts should add added shifts to the state', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        addedShifts: shiftSetOne
      })
      const res = shifts(initialStateWithAddedShifts, Actions.addShifts(convertShiftObjectToArray(shiftSetTwo)))
      expect(res.addedShifts).toEqual(combinedShifts)
    })

    it('#removeAddedShifts should delete the shifts', () => {
      Actions.removeAddedShifts(convertShiftObjectToArray(shiftSetOne))(dispatch, makeShiftState({
        addedShifts: combinedShifts
      }))

      // its a thunk so just checking that the payload is accurate
      expect(dispatch.calls.mostRecent().args[0].payload).toEqual(shiftSetTwo)
    })

    it('#editShifts should add edited shifts to the state', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        editedShifts: shiftSetOne
      })
      const res = shifts(initialStateWithAddedShifts, Actions.editShifts(convertShiftObjectToArray(shiftSetTwo)))
      expect(res.editedShifts).toEqual(combinedShifts)
    })

    it('#removeEditedShifts should delete teh shifts', () => {
      Actions.removeEditedShifts(convertShiftObjectToArray(shiftSetOne))(dispatch, makeShiftState({
        editedShifts: combinedShifts
      }))

      // its a thunk so just checking that the payload is accurate
      expect(dispatch.calls.mostRecent().args[0].payload).toEqual(shiftSetTwo)
    })

    it('#deleteShifts should add the ids to the state', () => {
      Actions.deleteShifts(convertShiftObjectToArray(shiftSetTwo))(dispatch, makeShiftState({
        deletedShifts: Object.keys(shiftSetOne)
      }))

      expect(dispatch.calls.mostRecent().args[0].payload.sort()).toEqual(Object.keys(combinedShifts).sort())
    })

    it('#removeDeletedShifts should delete the ids from the state', () => {
      Actions.removeDeletedShifts(convertShiftObjectToArray(shiftSetOne))(dispatch, makeShiftState({
        deletedShifts: Object.keys(combinedShifts)
      }))

      expect(dispatch.calls.mostRecent().args[0].payload.sort()).toEqual(Object.keys(shiftSetTwo).sort())
    })

  })

})
