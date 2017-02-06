import { ValidatorResponseObject } from 'src/models'
export type SelectOption = { display: string, value: string | number }
export type SelectOptions = SelectOption[]

export interface InputProps {
  label?: string
  value?: string
  message?: string
  valid?: boolean
  type?: string
  name?: string
  validateObj?: ValidatorResponseObject<any>
  displayErrors?: boolean
  onBlur?(): void
  onFocus?(): void
  onChangeEnd?(): void
  onChange?(val?: string): void
}

export interface InputI {
  onChange(): void
}
