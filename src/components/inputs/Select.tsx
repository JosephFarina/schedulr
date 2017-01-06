import * as React from 'react'

import {
  SelectOptions
} from './../../models'

const styles = require('./Select.css')
const ctx = require('classnames')

interface SelectProps {
  options: SelectOptions
  value: string
  onChange(val: string | number): void
}

interface SelectState {
  isFocused: boolean
}

class Select extends React.Component<SelectProps, SelectState> {
  public static defaultProps: SelectProps = {
    value: '',
    options: [],
    onChange: () => { }
  }

  constructor(props: SelectProps) {
    super(props)
    this.state = {
      isFocused: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  /**
   * 
   * Event Listeners
   * 
   */

  private handleClick() {
    this.setState({
      isFocused: true
    })
  }

  private handleMouseLeave() {
    this.setState({
      isFocused: false
    })
  }

  private handleItemClick(event: any, index: number) {
    event.stopPropagation()
    const { onChange, options } = this.props
    onChange(options[index].value)
    this.setState({
      isFocused: false
    })
  }

  /** 
   * 
   * Renderers
   * 
   */

  public render() {
    const {
      options,
      value
    } = this.props

    const { isFocused } = this.state

    const klass = ctx({

    })

    return (
      <div onClick={this.handleClick} onMouseLeave={this.handleMouseLeave} className={styles.container} >
        <div className={styles.label} >{value}</div>
        <div className={styles.carat}>^</div>
        {isFocused && <div className={styles.itemContainer}>
          {options && options.map((op, i) => <div onClick={e => {
            this.handleItemClick(e, i)
          } } className={styles.item} key={i}>{op.display}</div>)}
        </div>}
      </div>
    )
  }
}

export default Select


/**
 * 
 * options: {display: string, value: string|number}[]
 * selected: string|number
 * onChange(): option.value 
 */
