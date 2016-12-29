import * as MathUtils from './../math.utils'

describe('Math', () => {

  describe('mode', () => {

    it('should return correct value and only one value', () => {
      expect(MathUtils.mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17])).toEqual(6)
    })

  })

})
