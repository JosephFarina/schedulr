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

interface ChipsState {
  indexHoveredOver: number
}

class Chips extends React.Component<ChipsProps, ChipsState> {
  public static defaultProps: ChipsProps = {
    options: [],
    removeChip: () => { }
  }

  constructor(props: ChipsProps) {
    super(props)
    this.state = {
      indexHoveredOver: null
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
  }

  /**
   * 
   * Event Handlers
   * 
   */

  private handleMouseEnter(index: number) {
    this.setState({
      indexHoveredOver: index
    })
  }

  private handleMouseOut() {
    this.setState({
      indexHoveredOver: null
    })
  }

  /**
   * 
   * Renderers
   * 
   */

  private renderChip(option: SelectOption, index: number) {
    const {
      removeChip
    } = this.props

    const {
      indexHoveredOver
    } = this.state

    return (
      <div onMouseEnter={_ => this.handleMouseEnter(index)} onMouseLeave={this.handleMouseOut} className={styles.chip} key={index}>
        {option.display}
        {index === indexHoveredOver && <div className={styles.removeChip} onClick={_ => removeChip(option.value)}>X</div>}
      </div>
    )
  }

  public render() {
    const {
      options
    } = this.props

    const containerClass = ctx({
      [styles.container]: options.length > 0
    })

    return (
      <div className={containerClass}>
        {options.map((option, i) => this.renderChip(option, i))}
      </div>
    )
  }
}

export default Chips
