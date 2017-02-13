import { Option } from 'react-select'

import * as M from 'moment'
import {
  RShiftEditor,
  RState,
  ShiftTemplate,
} from 'src/models'

import {
  clientsOne,
  locationsOne,
} from 'src/testUtils'

import { validatorFactory } from 'src/utils'

import {
  // addEmployeeToShift,
  // alertUserOfErrorsInNewShift,
  // clearShiftEditor,
  // generateShifts,
  // removeEmployeeFromShift,
  // updateNewShift,
  // updateShiftDate,
  setEmployeesInShift
} from './../action'

import shiftEditor from './../reducer'

// import { getShiftBeingEdited } from './../selector'

const shift: ShiftTemplate = {
  duration: 24343,
  id: '432434',
  startTime: '234343',
  client: 'a423f',
  location: 'asdf32'
}


describe('shiftEditor', () => {

  it('set employees in shift by employee Options', () => {
    const employeeIds = ['one', 'two', 'three'].sort()
    const employeeOptions: Option[] = employeeIds.map(value => ({
      label: 'any',
      value
    }))

    const state = shiftEditor(undefined, setEmployeesInShift(employeeOptions))
    expect(state.employeesInShift.sort()).toEqual(employeeIds)
  })

  // it('add employee to shift should not add duplicated', () => {
  //   const employeeId = '134t1433reg'
  //   const state = shiftEditor(undefined, addEmployeeToShift(employeeId))
  //   const stateAfterAddingSecondShift = shiftEditor(state, addEmployeeToShift(employeeId))
  //   expect(stateAfterAddingSecondShift.employeesInShift.length).toEqual(1)
  // })

  // it('remove employee from shift', () => {
  //   const employeeIdToRemove = '5443234323432'
  //   const initialEmployeesInShift = ['54433432111', '551099543', employeeIdToRemove, '5433166611']
  //   const initialState: RShiftEditor = {
  //     editedShift: null,
  //     employeesInShift: Object.assign([], initialEmployeesInShift),
  //     newShift: {
  //       duration: null,
  //       startTime: null
  //     }
  //   }

  //   const state = shiftEditor(initialState, removeEmployeeFromShift(employeeIdToRemove))
  //   expect(state.employeesInShift.length).toEqual(initialEmployeesInShift.length - 1)
  //   expect(state.employeesInShift).not.toContain(employeeIdToRemove)
  // })

  // describe('#updateNewShift', () => {

  //   it('should update the new shift when its called', () => {
  //     const state = shiftEditor(undefined, updateNewShift(shift))
  //     expect(state.newShift).toEqual(shift)
  //   })

  //   it('should be able to update properties without altering other ones', () => {
  //     const newDuration = { duration: 14324128125 }
  //     const state = shiftEditor(<RShiftEditor> { newShift: { ...shift } }, updateNewShift(newDuration))
  //     expect(state.newShift.duration).toEqual(newDuration.duration)

  //     expect(state.newShift.startTime).toEqual(shift.startTime)
  //     expect(state.newShift.id).toEqual(shift.id)
  //   })

  // })


  // it('should chnage the date when a moment is provided', () => {
  //   const date = M().add(3, 'month')
  //   const state = shiftEditor(undefined, updateShiftDate(date))
  //   expect(state.shiftDate).toEqual(date.clone().hour(12).minutes(0).format())
  // })

  // it('should change the date when a string is provided', () => {
  //   const date = M().add(7, 'month')
  //   const state = shiftEditor(undefined, updateShiftDate(date))
  //   expect(state.shiftDate).toEqual(M(date).hour(12).minute(0).format())
  // })


  // it('#clearEditor', () => {
  //   const expectedVal: RShiftEditor = {
  //     newShift: null,
  //     editedShift: null
  //   }
  //   const state = shiftEditor({ editedShift: <ShiftTemplate> {}, 
  // newShift: <ShiftTemplate> {}, selectedShift: '1234324' }, clearShiftEditor())
  //   expect(state).toEqual(jasmine.objectContaining(expectedVal))
  // })

  // it('#generateShifts should dispatch initiateShiftGeneration if shift is valid', () => {
  //   const initialState: RState = {
  //     shift: {
  //       editor: {
  //         newShift: {
  //           client: '3qefds',
  //           duration: 30,
  //           id: null,
  //           location: '2rqwfdsf',
  //           startTime: M().format()
  //         },
  //         employeesInShift: []
  //       }
  //     }
  //   }

  //   const dispatch = jasmine.createSpy('dispatch')
  //   const getState = jasmine.createSpy('getState').and.returnValue(initialState)
  //   generateShifts()(dispatch, getState)

  //   expect(dispatch.calls.all().length).toEqual(1)
  //   // expect(dispatch.calls.mostRecent().args[0]).toEqual(initiateShiftGeneration())
  // })

  // it('#generateShifts should dispatch alertUserOfErrorsInNewShift if shift is valid', () => {
  //   const initialState: RState = {
  //     shift: {
  //       editor: {
  //         newShift: {
  //           client: null,
  //           duration: 5,
  //           id: null,
  //           location: '2rqwfdsf',
  //           startTime: M().format()
  //         },
  //         employeesInShift: []
  //       }
  //     }
  //   }

  //   const errorMessages = validatorFactory(getShiftBeingEdited(initialState))
  //   const dispatch = jasmine.createSpy('dispatch')
  //   const getState = jasmine.createSpy('getState').and.returnValue(initialState)
  //   generateShifts()(dispatch, getState)

  //   expect(dispatch.calls.all().length).toEqual(1)
  //   // expect(dispatch.calls.mostRecent().args[0]).toEqual(alertUserOfErrorsInNewShift(errorMessages))
  // })

})
