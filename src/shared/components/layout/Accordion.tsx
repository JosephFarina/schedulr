import * as React from 'react'
import { PropTypes } from 'react'

const styles = require('./Accordion.css')
const ctx = require('classnames')

interface AccordionProps {
  children?: React.ReactChildren
}

interface AccordionState {
  open: boolean
}

class Accordion extends React.Component<AccordionProps, AccordionState> {
  public static defaultProps: AccordionProps = {
  }

  constructor(props: AccordionProps) {
    super(props)
    this.state = {
      open: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this)
  }

  private toggleVisibility() {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  private validateChildren() {
    const { children } = this.props

    if (!Array.isArray(children)) {
      throw new Error('Accordion children must be an array')
    }

    if (children.length !== 2) {
      throw new Error('Accordion must have exactly two children')
    }

  }

  private getTitle() {
    const { children } = this.props
    this.validateChildren()
    return (children as Array<any>)[0]
  }

  private getBody() {
    const { children } = this.props
    this.validateChildren()
    return (children as Array<any>).slice(1)
  }

  public render() {
    const { children } = this.props

    const { open } = this.state

    const bodyClass = ctx({
      [styles.body]: true,
      [styles.bodyOpen]: open
    })

    return (
      <div>
        <div onClick={this.toggleVisibility} className={styles.label}>
          {this.getTitle()}
        </div>
        {open &&
          <div className={bodyClass}>
            {this.getBody()}
          </div>
        }
      </div>
    )
  }
}

export { Accordion }
