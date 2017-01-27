import * as React from 'react'

import {
  SelectOptions,
  SelectOption
} from 'src/models'

const styles = require('./Select.css')
const ctx = require('classnames')

interface SelectProps {
  options: SelectOptions
  value: string
  onChange(val: string | number): void
}

interface SelectState {
  isFocused?: boolean
  selectedIndex?: number
}

export class Select extends React.Component<SelectProps, SelectState> {
  public static defaultProps: SelectProps = {
    value: '',
    options: [],
    onChange: () => { }
  }

  constructor(props: SelectProps) {
    super(props)
    this.state = {
      isFocused: false,
      selectedIndex: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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
    this.resetState()
  }

  private handleItemClick(event: any, index: number) {
    event.stopPropagation()
    const { onChange, options } = this.props
    onChange(options[index].value)

    this.resetState()
  }

  private handleDownKeyPress(e: KeyboardEvent) {
    e.preventDefault()

    const { selectedIndex } = this.state
    const { options } = this.props
    let newSelectedIndex: number

    if (selectedIndex === null || selectedIndex + 1 === options.length) {
      newSelectedIndex = 0
    } else {
      newSelectedIndex = selectedIndex + 1
    }

    this.setState({
      selectedIndex: newSelectedIndex
    })
  }

  private handleUpKeyPress(e: KeyboardEvent) {
    e.preventDefault()

    const { selectedIndex } = this.state
    const { options } = this.props
    let newSelectedIndex: number

    if (selectedIndex === null || selectedIndex === 0) {
      newSelectedIndex = options.length - 1
    } else {
      newSelectedIndex = selectedIndex - 1
    }

    this.setState({
      selectedIndex: newSelectedIndex
    })
  }

  private handleEnterKey() {
    const { onChange, options } = this.props
    const { selectedIndex } = this.state
    onChange(options[selectedIndex].value)

    this.resetState()
  }

  private handleKeyPress(e: any): void {
    const key = e.which
    if (key === 38) {
      this.handleUpKeyPress(e)
    } else if (key === 40) {
      this.handleDownKeyPress(e)
    } else if (key === 13) {
      this.handleEnterKey()
    }
  }

  /**
   *
   * Helpers 
   * 
   */

  private resetState() {
    this.setState({
      isFocused: false,
      selectedIndex: null
    })
  }

  private resetSelectedIndex() {
    this.setState({
      selectedIndex: null
    })
  }

  /** 
   * 
   * Renderers
   * 
   */

  private renderItems() {
    const {
      options,
    } = this.props

    const {
      isFocused,
      selectedIndex
    } = this.state

    if (isFocused || selectedIndex !== null) {
      return (
        <div className={styles.itemContainer}>
          {options && options.map((op, i) => (this.renderItem(op, i)))}
        </div>
      )
    }

  }

  private renderItem(option: SelectOption, index: number) {
    const { selectedIndex } = this.state
    const className = ctx({
      [styles.item]: true,
      [styles.itemActive]: index === selectedIndex
    })

    return (
      <div
        onClick={e => { this.handleItemClick(e, index) } }
        onMouseOver={_ => this.resetSelectedIndex()}
        className={className} key={index}>
        {option.display}
      </div>
    )
  }

  public render() {
    const {
      value
    } = this.props

    return (
      <div onKeyDown={this.handleKeyPress} tabIndex={0}
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        className={styles.container} >

        <div className={styles.label} >{value}</div>
        <div className={styles.carat}>^</div>
        {this.renderItems()}
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
