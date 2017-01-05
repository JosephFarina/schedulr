import * as React from 'react'

import Input from './Input'

import { InputProps } from './models'

const ctx = require('classnames')
const styles = require('./AutoComplete.css')

interface Props extends InputProps {
  results?: string[]
}

interface State {
  selectedIndex?: number
  focused?: boolean
}

class AutoComplete extends React.Component<Props, State> {
  public inputComp: Input
  public static defaultProps: Props = {
    label: '',
    value: '',
    onBlur: () => { },
    onChange: () => { },
    onFocus: () => { },
    onChangeEnd: () => { },
    results: []
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      selectedIndex: null,
      focused: false
    }

    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * 
   * Prop Functions
   * 
   */

  private handleChange(val: string) {
    const { onChange } = this.props
    return onChange(val)
  }

  private updateValueToSelectedIndex() {
    const { selectedIndex } = this.state
    const { results } = this.props

    this.handleChange(results[selectedIndex])
  }

  /**
   * 
   * Event Handlers
   * 
   */

  private handleInputFocus() {
    const { onFocus } = this.props

    this.setState({ focused: true })
    onFocus()
  }

  private handleInputBlur() {
    const { onBlur } = this.props

    this.setState({ focused: false })
    onBlur()
  }

  private handleKeyPress(e: any) {
    if (e.which === 40) {
      this.handleDownArrowKey()
    } else if (e.which === 38) {
      this.handleUpArrowKey()
    } else if (e.which === 13) {
      this.handleEnterKey()
    }
  }

  private handleDownArrowKey() {
    const { results } = this.props
    const { selectedIndex } = this.state

    if (selectedIndex === null) {
      this.setState({ selectedIndex: 0 })
    } else if (selectedIndex < results.length - 1) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex + 1
      }))
    }
  }

  private handleUpArrowKey() {
    const { selectedIndex } = this.state

    if (selectedIndex > 0) {
      this.setState(prevState => ({
        selectedIndex: prevState.selectedIndex - 1
      }))
    } else {
      this.setState({ selectedIndex: null })
    }
  }

  private handleEnterKey() {
    this.updateValueToSelectedIndex()
    this.inputComp.blur()
  }

  private handleMouseOverItem(index: number) {
    this.setState({
      selectedIndex: index
    }, () => this.updateValueToSelectedIndex())
  }

  /**
   * 
   * Predicates
   * 
   */

  private showItems(): boolean {
    const { results } = this.props
    return results.length > 0 && this.state.focused || false
  }

  /**
   * 
   * Renderers
   * 
   */

  private renderItem(index: number) {
    const {results} = this.props
    const {selectedIndex} = this.state
    const className = ctx({
      [styles.item]: true,
      [styles.itemActive]: selectedIndex === index
    })

    return (
      <div key={index} onMouseOver={_ => this.handleMouseOverItem(index)} className={className}>{results[index]}</div>
    )
  }

  public render() {
    const {
      value,
      label,
      results,
      onChangeEnd
    } = this.props

    return (
      <div onKeyDown={this.handleKeyPress} >
        <Input
          ref={input => this.inputComp = input}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          value={value}
          label={label}
          onChange={this.handleChange}
          onChangeEnd={onChangeEnd}>

          {this.showItems() && <div className={styles.container}>
            {results.map((_, i) => this.renderItem(i))}
          </div>}
        </Input>
      </div>
    )
  }
}

export default AutoComplete
