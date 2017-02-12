// TODO: FIXME: GET THIS WORKNG AGAIN

// import {
//   Clients,
//   Employees,
//   Locations,
//   SelectOption,
//   SelectOptions,
// } from 'src/models'

// import {
//   client,
//   clientsOne,
//   clientsOneArray,
//   clientsTwo,
//   employee,
//   employeesOne,
//   employeesOneArray,
//   employeesTwo,
//   location,
//   locationsOne,
//   locationsOneArray,
//   locationsTwo
// } from 'src/testUtils/mockData'

// import {
//   convertEntityToSelectOptions
// } from 'src/utils'

// describe('ConvertToSelectOption', () => {

//   describe('#convertClientsToSelectOptions', () => {
//     let res: SelectOptions


//     describe('object', () => {

//       it('should filter out keys if they are included', () => {
//         const employeeIdKeys = Object.keys(employeesOne)
//         const keysToNotInclude = [employeeIdKeys[employeeIdKeys.length - 1]]
//         const expectedKeys = employeeIdKeys.filter(key => keysToNotInclude.indexOf(key) < 0)
//         res = convertEntityToSelectOptions(employeesOne, keysToNotInclude)

//         expect(res.length).toEqual(expectedKeys.length)
//       })

//       describe('clients', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(clientsOne)
//         })

//         it('should return an array of the same lenght as the number of keys', () => {
//           expect(res.length).toEqual(Object.keys(clientsOne).length)
//         })

//         it('each array value should have the id as a value', () => {
//           testForCorrectValues(res, clientsOne)
//         })

//         it('each array display should be the clients name', () => {
//           testForCorrectDisplay(res, clientsOne)
//         })

//       })

//       describe('employees', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(employeesOne)
//         })

//         it('should return an array of the same length as the number of keys', () => {
//           expect(res.length).toEqual(Object.keys(employeesOne).length)
//         })

//         it('each array item should have the employees id as the value', () => {
//           testForCorrectValues(res, employeesOne)
//         })

//         it('each array display should be the clients name', () => {
//           testForCorrectDisplay(res, employeesOne)
//         })

//       })

//       describe('locations', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(locationsOne)
//         })

//         it('should return an array of the same length as the number of keys', () => {
//           expect(res.length).toEqual(Object.keys(locationsOne).length)
//         })

//         it('each array item should have the employees id as the value', () => {
//           testForCorrectValues(res, locationsOne)
//         })

//         it('each array display should be the clients name', () => {
//           testForCorrectDisplay(res, locationsOne)
//         })

//       })

//     })

//     describe('array', () => {

//       describe('clients', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(clientsOneArray)
//         })

//         it('should return an array of the same length as the number of clients and each one should have id and and alias ', () => {
//           expect(res.length).toEqual(clientsOneArray.length)
//           res.forEach((client, i) => {
//             expect(client.value).toEqual(clientsOneArray[i].id)
//             expect(client.display).toEqual(clientsOneArray[i].alias)
//           })
//         })

//       })

//       describe('employees', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(employeesOneArray)
//         })

//         it('should return an array of the same length as the number of clients and each one should have id and and alias ', () => {
//           expect(res.length).toEqual(employeesOneArray.length)
//           res.forEach((employee, i) => {
//             expect(employee.value).toEqual(employeesOneArray[i].id)
//             expect(employee.display).toEqual(employeesOneArray[i].alias)
//           })
//         })

//       })

//       describe('locations', () => {
//         beforeEach(() => {
//           res = convertEntityToSelectOptions(locationsOneArray)
//         })

//         it('should return an array of the same length as the number of clients and each one should have id and and alias ', () => {
//           expect(res.length).toEqual(locationsOneArray.length)
//           res.forEach((location, i) => {
//             expect(location.value).toEqual(locationsOneArray[i].id)
//             expect(location.display).toEqual(locationsOneArray[i].alias)
//           })
//         })

//       })

//     })

//   })


// })

// function testForCorrectValues(res: SelectOptions, entity: Clients | Employees | Locations) {
//   const values = getSelectOptionsValue(res)
//   const expectedValues = Object.keys(entity).map(entityId => entity[entityId].id).sort()
//   expect(values).toEqual(expectedValues)
// }

// function testForCorrectDisplay(res: SelectOptions, entity: Clients | Employees | Locations) {
//   const displays = getSelectOptionsDisplay(res)
//   const expectedDisplays = Object.keys(entity).map(entityId => entity[entityId].alias).sort()
//   expect(displays).toEqual(expectedDisplays)
// }

// function getSelectOptionsDisplay(options: SelectOptions) {
//   return options.map(option => option.display).sort()
// }

// function getSelectOptionsValue(options: SelectOptions) {
//   return options.map(option => option.value).sort()
// }
