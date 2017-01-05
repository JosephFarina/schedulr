import {
  RShiftEditor,
  Shift,
} from './../../../../models'

import {
  // updateEditedShift,
  clearShiftEditor,
  updateNewShift
} from './../action'

import shiftEditor from './../reducer'

import {
  getShiftBeingEdited,
} from './../selector'

const shift: Shift = {
  duration: 24343,
  id: '432434',
  startTime: '234343'
}

describe('shiftEditor', () => {

  // describe('#updateEditedShift', () => {

  //   it('should update the shift when its called', () => {
  //     const state = shiftEditor(undefined, updateEditedShift(shift))
  //     expect(state.editedShift).toEqual(shift)
  //   })

  // })


  describe('#updateNewShift', () => {

    it('should update the new shift when its called', () => {
      const state = shiftEditor(undefined, updateNewShift(shift))
      expect(state.newShift).toEqual(shift)
    })

  })


  it('#clearEditor', () => {
    const expectedVal: RShiftEditor = {
      newShift: null,
      editedShift: null
    }
    const state = shiftEditor({ editedShift: <Shift> {}, newShift: <Shift> {}, selectedShift: '1234324' }, clearShiftEditor())
    expect(state).toEqual(jasmine.objectContaining(expectedVal))
  })



})
