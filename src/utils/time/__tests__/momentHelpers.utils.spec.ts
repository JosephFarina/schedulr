import * as M from 'moment'

import * as MomentHelpers from './../momentHelpers.util'

describe('MomentHelpers', () => {

  describe('#cloneOrCreate', () => {

    it('if provided a string should create a moment of the same val', () => {
      const str = M().add(1, 'month').format()
      const res = MomentHelpers.cloneOrCreateMo(str)
      expect(res.format()).toEqual(str)
    })

    it('it should accept a moment and clone', () => {
      const res = MomentHelpers.cloneOrCreateMo(M())
      expect(M.isMoment(res)).toBeTruthy()
    })

    it('if no value is given it should return the current moment', () => {
      const curMo = M().format()
      const res = MomentHelpers.cloneOrCreateMo()
      expect(res.format()).toEqual(curMo)
    })

  })

})
