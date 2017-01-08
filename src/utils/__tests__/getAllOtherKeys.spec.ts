import {
  getAllOtherKeys
} from 'src/utils'

it('should return all keys besides the ones provided', () => {
  const vals = {
    '0': {},
    '1': {},
    '2': {},
    '3': {},
    '4': {},
    '5': {}
  }

  const filter = ['1', '3', '5']
  const expected = ['0', '2', '4'].sort()
  const res = getAllOtherKeys(vals, filter).sort()
  expect(res).toEqual(expected)
})
