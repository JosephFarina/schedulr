import * as React from 'react'
import * as ReactSelect from 'react-select'
import { Creatable, ReactCreatableSelectProps } from 'react-select'
import { Entities, Entity, InputProps } from 'src/models'
import { convertEntityToSelectOptions } from 'src/utils'
import { InputValidatorWrapper } from './InputValidatorWrapper'

const styles = require('./Select.scss')

interface SelectProps extends InputProps {
  creatable?: boolean
  entities?: Entities<any> | Entity[]
  entity?: Entity
}

const defaultProps: SelectProps = {
  creatable: false
}

/**
 * 
 * Props extends React-Selects 
 * If an Entities obj or Entity[] is entered without options then 
 * they will be converted into an option array
 * 
 */

const UnwrappedSelect: React.StatelessComponent<SelectProps> = (props: SelectProps) => {
  const {entities, entity, creatable, onFocus} = props
  const entityOptions = entities ? convertEntityToSelectOptions(entities) : []
  // const entityOption = entity ? convertEntityToSelectOptions([entity])[0] : null


  return creatable ?
    (
      <Creatable
        options={entityOptions}
        onFocus={onFocus}
        {...props}
      />
    )
    :
    (
      <ReactSelect
        options={entityOptions}
        onFocus={onFocus}
        {...props}
      />
    )
}

UnwrappedSelect.defaultProps = defaultProps

const Select = InputValidatorWrapper(UnwrappedSelect)

export { Select }
