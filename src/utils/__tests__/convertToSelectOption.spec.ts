import { values } from 'ramda'
import { clientsOne } from 'src/testUtils/mockData'

import { convertEntityToSelectOptions } from 'src/utils'

describe('Utils#convertEntityToSelectOptions', () => {

  it('should convert object of entities to array select options', () => {
    const res = convertEntityToSelectOptions(clientsOne)
    expect(Array.isArray(res)).toBeTruthy()
    expect(values(clientsOne).length).toEqual(res.length)
    res.forEach(option => {
      const ent = clientsOne[option.value]
      expect(ent.id).toEqual(option.value)
      expect(ent.alias).toEqual(option.label)
    })
  })

  it('should convert object of entities to array select options', () => {
    const res = convertEntityToSelectOptions(values(clientsOne))

    expect(values(clientsOne).length).toEqual(res.length)
    res.forEach(option => {
      const ent = clientsOne[option.value]
      expect(ent.id).toEqual(option.value)
      expect(ent.alias).toEqual(option.label)
    })
  })

})
