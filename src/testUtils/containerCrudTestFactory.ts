import { ReactWrapper } from 'enzyme'
const curry = require('ramda/src/curry')

import { findInputFromInputComp } from 'src/testUtils'

export const containerCrudTestFactory = curry((
  inputComponent: ReactWrapper<any, any>,
  dispatch: jasmine.Spy,
  fieldsInState: Object,
  action: Function,
  fieldBeingTested: string
) => {
  const emptyStringOrCurrVal = Object.keys(fieldsInState).reduce((res, currField) => {
    if (currField === fieldBeingTested) {
      return Object.assign({}, res, {
        [currField]: fieldsInState[currField]
      })
    } else {
      return Object.assign({}, res, {
        [currField]: ''
      })
    }
  }, {})

  it(`${fieldBeingTested} change`, done => {
    inputComponent.setState({ fields: emptyStringOrCurrVal })
    const input = findInputFromInputComp(inputComponent, fieldBeingTested)
    input.simulate('change', { target: { value: fieldsInState[fieldBeingTested] } })

    // Need to wait for the inputs debounce after simulating change event
    setTimeout(() => {
      const expectedAction = action(emptyStringOrCurrVal)
      expect(dispatch.calls.mostRecent().args).toEqual([expectedAction])

      done()
    }, 500)
  })
})
