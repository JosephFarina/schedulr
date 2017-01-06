import {
  RShiftEditor,
  Shift,
} from './../../../../models'

import {
  // updateEditedShift,
  addEmployeeToShift,
  clearShiftEditor,
  removeEmployeeFromShift,
  updateNewShift,
} from './../action'

import shiftEditor from './../reducer'

import {
  getShiftBeingEdited,
} from './../selector'

const shift: Shift = {
  duration: 24343,
  id: '432434',
  startTime: '234343',
  client: 'a423f',
  employee: ['423rewf'],
  location: 'asdf32'
}

describe('shiftEditor', () => {

  // describe('#updateEditedShift', () => {

  //   it('should update the shift when its called', () => {
  //     const state = shiftEditor(undefined, updateEditedShift(shift))
  //     expect(state.editedShift).toEqual(shift)
  //   })

  // })

  it('add employee to shift', () => {
    const employeeId = '23452233465434'
    const state = shiftEditor(undefined, addEmployeeToShift(employeeId))
    expect(state.employeesInShift).toContain(employeeId)
  })

  it('remove employee from shift', () => {
    const employeeIdToRemove = '5443234323432'
    const initialEmployeesInShift = ['54433432111', '551099543', employeeIdToRemove, '5433166611']
    const initialState: RShiftEditor = {
      editedShift: null,
      employeesInShift: Object.assign([], initialEmployeesInShift),
      newShift: {
        duration: null,
        startTime: null
      }
    }

    const state = shiftEditor(initialState, removeEmployeeFromShift(employeeIdToRemove))
    expect(state.employeesInShift.length).toEqual(initialEmployeesInShift.length - 1)
    expect(state.employeesInShift).not.toContain(employeeIdToRemove)
  })

  describe('#updateNewShift', () => {

    it('should update the new shift when its called', () => {
      const state = shiftEditor(undefined, updateNewShift(shift))
      expect(state.newShift).toEqual(shift)
    })

    it('should be able to update properties without altering other ones', () => {
      const newDuration = { duration: 14324128125 }
      const state = shiftEditor(<RShiftEditor>{ newShift: { ...shift } }, updateNewShift(newDuration))
      expect(state.newShift.duration).toEqual(newDuration.duration)

      expect(state.newShift.startTime).toEqual(shift.startTime)
      expect(state.newShift.id).toEqual(shift.id)
    })

  })


  it('#clearEditor', () => {
    const expectedVal: RShiftEditor = {
      newShift: null,
      editedShift: null
    }
    const state = shiftEditor({ editedShift: <Shift>{}, newShift: <Shift>{}, selectedShift: '1234324' }, clearShiftEditor())
    expect(state).toEqual(jasmine.objectContaining(expectedVal))
  })



})
