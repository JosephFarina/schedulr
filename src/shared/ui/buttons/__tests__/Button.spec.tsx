// import { mount } from 'enzyme'
// import * as React from 'react'
// import { Link } from 'react-router'

// import { Button, Loading } from 'src/shared/ui'

// describe('Button', () => {
//   const childText = 'Hello Im in a button'

//   it('should include a link element when attribute is added', () => {
//     const wrapper = mount(<Button to='hello'>{childText}</Button>)
//     expect(wrapper.find(Link).length).toEqual(1)
//   })

//   it('should add disabled if passed', () => {
//     const wrapper = mount(<Button disabled></Button >)
//     expect(wrapper.find('[disabled]').length).toEqual(1)
//   })

//   describe('should pass child elements through when not loading and not contain a loading component', () => {
//     function testWrapperForChildrenAndLackOfLoading(wrapper) {
//       expect(wrapper.html()).toContain(childText)
//       expect(wrapper.find(Loading).length).toEqual(0)
//     }

//     it('when a link', () => {
//       const wrapper = mount(<Button to='hello'>{childText}</Button>)
//       testWrapperForChildrenAndLackOfLoading(wrapper)
//     })

//     it('when not a link', () => {
//       const wrapper = mount(<Button>{childText}</Button>)
//       testWrapperForChildrenAndLackOfLoading(wrapper)
//     })
//   })

//   describe('should not pass child elements and pass a loading element when loading is true and be disabled', () => {
//     function testWrapperForLackOfChildrenAndLoading(wrapper) {
//       expect(wrapper.html()).not.toContain(childText)
//       expect(wrapper.find(Loading).length).toEqual(1)
//       expect(wrapper.find('[disabled]').length).toEqual(1)
//     }

//     it('when a link', () => {
//       const wrapper = mount(<Button to='hello' loading>{childText}</Button>)
//       testWrapperForLackOfChildrenAndLoading(wrapper)
//     })

//     it('when not a link', () => {
//       const wrapper = mount(<Button loading>{childText}</Button>)
//       testWrapperForLackOfChildrenAndLoading(wrapper)
//     })
//   })

// })

