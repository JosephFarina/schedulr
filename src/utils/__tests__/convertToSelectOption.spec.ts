// import { values } from 'ramda'
// import { CLIENTS } from 'src/testUtils/mockData'
// import 
// import { convertEntityToSelectOptions } from 'src/utils'

// describe('Utils#convertEntityToSelectOptions', () => {

//   it('should convert object of entities to array select options', () => {
//     const res = convertEntityToSelectOptions(CLIENTS)
//     expect(Array.isArray(res)).toBeTruthy()
//     expect(values(CLIENTS).length).toEqual(res.length)
//     res.forEach(option => {
//       const ent = CLIENTS[option.value]
//       expect(ent.id).toEqual(option.value)
//       expect(ent.alias).toEqual(option.label)
//     })
//   })

//   it('should convert object of entities to array select options', () => {
//     const res = convertEntityToSelectOptions(values(CLIENTS))

//     expect(values(CLIENTS).length).toEqual(res.length)
//     res.forEach(option => {
//       const ent = CLIENTS[option.value]
//       expect(ent.id).toEqual(option.value)
//       expect(ent.alias).toEqual(option.label)
//     })
//   })

// })
