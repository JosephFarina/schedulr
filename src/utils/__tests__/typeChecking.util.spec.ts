import * as M from 'moment'

import * as Type from './../typeChecking.util'

describe('TypeChecking Helper', () => {

  describe('#isMoment', () => {

    it('should be true if a moment', () => {
      expect(Type.isMoment(M())).toBeTruthy()
    })

    it('should be false if not a moment', () => {
      expect(Type.isMoment('asdf')).toBeFalsy()
      expect(Type.isMoment(2343)).toBeFalsy()
      expect(Type.isMoment({})).toBeFalsy()
      expect(Type.isMoment(null)).toBeFalsy()
      expect(Type.isMoment(undefined)).toBeFalsy()
    })

  })

  describe('#isString', () => {

    it('should be true if a string', () => {
      expect(Type.isString('asdfd')).toBeTruthy()
    })

    it('should be false if not a string', () => {
      expect(Type.isString(14)).toBeFalsy()
      expect(Type.isString(null)).toBeFalsy()
      expect(Type.isString(undefined)).toBeFalsy()
      expect(Type.isString({})).toBeFalsy()
    })

  })

})

