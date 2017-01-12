import * as React from 'react'
import configureStore from 'redux-mock-store'

const middlewares: any[] = []
const mockStore = configureStore(middlewares)

import {
  shallow
} from 'enzyme'

import { Alert } from './../Alert'

// const styles = require('./../Alert.css')

it('should summarize all the error messages', () => {
  const messages = [
    'This is the first message',
    'This is the second',
    'This is the third'
  ]

  const wrapper = shallow(<Alert messages={messages} />)
  const text = wrapper.text()
  expect(text).toEqual(`${messages[0]} and 2 more errors`)
})

it('should not have the plural if there is only one more message', () => {
  const messages = [
    'This is the first message',
    'This is the second',
  ]

  const wrapper = shallow(<Alert messages={messages} />)
  const text = wrapper.text()
  expect(text).toEqual(`${messages[0]} and 1 more error`)
})

it('should not have and.. if there is only one message', () => {
  const messages = [
    'This is the first message'
  ]

  const wrapper = shallow(<Alert messages={messages} />)
  const text = wrapper.text()
  expect(text).toEqual(`${messages[0]}`)
})