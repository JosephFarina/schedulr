import * as React from 'react'
import { PropTypes } from 'react'

const styles = require('./Accordion.css')
const ctx = require('classnames')

const openIcon = require('public/icons/filetree--open.svg')
const closedIcon = require('public/icons/filetree--closed.svg')

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
    } else if (children.length !== 2) {
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
    const { open } = this.state
    const bodyClass = ctx({
      [styles.body]: true,
      [styles.bodyOpen]: open
    })

    return (
      <div className={styles.container}>
        <div onClick={this.toggleVisibility} className={styles.label}>
          <img className={styles.labelIcon} src={open ? openIcon : closedIcon} alt=""/>
          <div className={styles.labelText}>{this.getTitle()}</div>
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
