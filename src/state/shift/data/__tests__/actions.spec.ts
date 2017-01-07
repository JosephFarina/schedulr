import configureStore from 'redux-mock-store'

const middlewares: any = []
const mockStore = configureStore(middlewares)

import * as Actions from './../action'
import shifts, { initialState } from './../reducer'
import * as Selectors from './../selector'
import * as Models from 'src/models'
import { convertShiftObjectToArray } from 'src/utils'

describe('Shift State', () => {
  it('sanity check that it returns the correct initial state', () => {
    expect(shifts(undefined, { type: null, payload: null })).toEqual(initialState)
  })

  describe('Shift CRUD actions', () => {
    let shiftSetOne: Models.Shifts
    let shiftSetTwo: Models.Shifts
    let combinedShifts: Models.Shifts

    beforeEach(() => {
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
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        addedShifts: combinedShifts
      })

      const res = shifts(initialStateWithAddedShifts, Actions.removeAddedShifts(convertShiftObjectToArray(shiftSetOne)))
      expect(res.addedShifts).toEqual(shiftSetTwo)
    })

    it('#editShifts should add edited shifts to the state', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        editedShifts: shiftSetOne
      })
      const res = shifts(initialStateWithAddedShifts, Actions.editShifts(convertShiftObjectToArray(shiftSetTwo)))
      expect(res.editedShifts).toEqual(combinedShifts)
    })

    it('#removeEditedShifts should delete teh shifts', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        editedShifts: combinedShifts
      })
      const res = shifts(initialStateWithAddedShifts, Actions.removeEditedShifts(convertShiftObjectToArray(shiftSetOne)))
      expect(res.editedShifts).toEqual(shiftSetTwo)
    })

    it('#deleteShifts should add the ids to the state', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        deletedShifts: Object.keys(shiftSetOne)
      })
      const res = shifts(initialStateWithAddedShifts, Actions.deleteShifts(convertShiftObjectToArray(shiftSetTwo)))
      expect(res.deletedShifts.sort()).toEqual(Object.keys(combinedShifts).sort())
    })

    it('#removeDeletedShifts should delete the ids from the state', () => {
      const initialStateWithAddedShifts: Models.RShiftData = Object.assign({}, initialState, {
        deletedShifts: Object.keys(combinedShifts)
      })
      const res = shifts(initialStateWithAddedShifts, Actions.removeDeletedShifts(convertShiftObjectToArray(shiftSetOne)))
      expect(res.deletedShifts.sort()).toEqual(Object.keys(shiftSetTwo).sort())
    })

  })

})
