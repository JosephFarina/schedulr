import { compose } from 'ramda'

import I from './Input'
export * from './Select'
export * from './DatePicker'

import { InputValidatorWrapper } from './InputValidatorWrapper'
import { InputControlWrapper } from './InputControlWrapper'
import { InputTimeWrapper } from './InputTimeWrapper'

export const Input = compose(
  InputControlWrapper,
  InputValidatorWrapper,
)(I)

export const UncontrolledInput = InputValidatorWrapper(I)

export const TimeInput = InputTimeWrapper(Input)
