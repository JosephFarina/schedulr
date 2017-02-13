import * as React from 'react'
import * as ReactSelect from 'react-select'
import { Creatable, ReactCreatableSelectProps } from 'react-select'
import { Entities, Entity } from 'src/models'
import { convertEntityToSelectOptions } from 'src/utils'

const styles = require('./Select.scss')

interface SelectProps extends ReactCreatableSelectProps {
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

const Select: React.StatelessComponent<SelectProps> = (props: SelectProps) => {
  const {entities, entity, creatable} = props
  const entityOptions = entities ? convertEntityToSelectOptions(entities) : []
  // const entityOption = entity ? convertEntityToSelectOptions([entity])[0] : null


  return creatable ?
    (
      <Creatable
        options={entityOptions}
        className={styles.container}
        {...props}
      />
    )
    :
    (
      <ReactSelect
        options={entityOptions}
        className={styles.container}
        {...props}
      />
    )
}

Select.defaultProps = defaultProps

export { Select }
