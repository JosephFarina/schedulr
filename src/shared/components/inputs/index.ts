import { compose } from 'ramda'

import UncontrolledInput from './Input'
export * from './Select'
export * from './DatePicker'

import { InputValidatorWrapper } from './InputValidatorWrapper'
import { InputControlWrapper } from './InputControlWrapper'
import { InputTimeWrapper } from './InputTimeWrapper'

export const Input = compose(
  InputControlWrapper,
  InputValidatorWrapper,
)(UncontrolledInput)

export const TimeInput = InputTimeWrapper(Input)
