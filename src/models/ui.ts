import { ValidatorResponseObject, Entities, Entity } from 'src/models'
import { Moment } from 'moment'
export interface InputProps {
  id?: string
  entities?: Entities<any> | Entity[]
  placeholder?: string
  label?: string
  value?: string | Entity[] | Entity
  message?: string
  valid?: boolean
  invalid?: boolean
  multi?: boolean
  date?: Moment
  type?: string
  name?: string
  validateObj?: ValidatorResponseObject<any>
  displayErrors?: boolean
  onBlur?(): void
  onFocus?(): void
  onChangeEnd?(val?: any): void
  onChange?(val?: any): void
  onDateChange?(mo: Moment): void
}

export interface InputI {
  onChange(): void
}
