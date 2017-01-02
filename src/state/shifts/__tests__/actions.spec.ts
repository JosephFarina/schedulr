import configureStore from 'redux-mock-store'

const middlewares: any = []
const mockStore = configureStore(middlewares)

import * as Models from './../../../models'
import * as Actions from './../action'
import shifts, { initialState } from './../reducer'
import * as Selectors from './../selector'


describe('Shift State', () => {
  it('sanity check that it returns the correct initial state', () => {
    expect(shifts(undefined, { type: null, payload: null })).toEqual(initialState)
  })

  describe('Shift CRUD actions', () => {

    it('#addShifts should add shifts and also keep shifts that were already added', () => {
      const alreadyAddedShifts: Models.Shifts = {
        'fffdfdfdf': {
          id: 'fffdfdfdf',
          duration: 34343,
          startTime: '4343434'
        }
      }

      const initialStateWithAddedShifts: Models.RShifts = Object.assign({}, initialState, {
        addedShifts: alreadyAddedShifts
      })

      const expectedShiftValue: Models.Shifts = {
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

      const shiftsToAdd = Object.keys(expectedShiftValue).map(shiftId => expectedShiftValue[shiftId])

      const res = shifts(initialStateWithAddedShifts, Actions.addShifts(shiftsToAdd))
      expect(res.addedShifts).toEqual(jasmine.objectContaining(expectedShiftValue))
      expect(res.addedShifts).toEqual(jasmine.objectContaining(alreadyAddedShifts))
    })

    it('#removedAddedShifts should delete the shifts', () => {
      const alreadyAddedShifts = {
        'fffdfdfdf': {
          id: 'fffdfdfdf',
          duration: 34343,
          startTime: '4343434'
        },
        'asdfdfjlasdf': {
          id: 'asdfdfjlasdf',
          duration: 34343,
          startTime: '4343434'
        }
      }

      const shiftsToDelete = [Object.assign({}, alreadyAddedShifts.asdfdfjlasdf)]
      const initialStateWithAddedShifts: Models.RShifts = Object.assign({}, initialState, { addedShifts: alreadyAddedShifts })
      const res = shifts(initialStateWithAddedShifts, Actions.deleteAddedShifts(shiftsToDelete))

      Object.keys(res.addedShifts).forEach(addedShiftId => {
        const addedShift = res.addedShifts[addedShiftId]
        shiftsToDelete.forEach(shiftToDelete => {
          expect(addedShift).not.toEqual(shiftToDelete)
        })
      })

    })

  })

})
