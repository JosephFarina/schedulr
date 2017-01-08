import * as React from 'react'

import {
  SelectOption,
  SelectOptions,
} from 'src/models'

const styles = require('./Chips.css')
const ctx = require('classnames')

interface ChipsProps {
  options?: SelectOptions
  removeChip?(val: string | number): void
}

const defaultProps: ChipsProps = {
  options: [],
  removeChip: () => { }
}

const Chips: React.StatelessComponent<ChipsProps> = (props: ChipsProps) => {
  const {
    options,
    removeChip
  } = props

  const containerClass = ctx({
    [styles.container]: true
  })

  return (
    <div className={containerClass}>
      {options.map((option, i) => {
        return (
          <div key={i}>
            <div>{option.display}</div>
            <div onClick={_ => removeChip(option.value)}>X</div>
          </div>
        )
      })}
    </div>
  )
}

Chips.defaultProps = defaultProps

export default Chips
