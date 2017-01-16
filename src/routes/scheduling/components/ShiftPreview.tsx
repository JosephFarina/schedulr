import * as M from 'moment'
import * as React from 'react'

import {
  Shift
} from 'src/models'

const styles = require('./ShiftPreview.css')
const ctx = require('classnames')

interface ShiftPreviewProps {
  shift: Shift
  onRequestDelete?(shift: Shift): void
}

interface ShiftPreviewState {
  showDeleteButton?: boolean
  mouseIsDownOnComp?: boolean
}

export class ShiftPreview extends React.Component<ShiftPreviewProps, ShiftPreviewState> {
  constructor(props: ShiftPreviewProps) {
    super(props)
    this.state = {
      showDeleteButton: false,
      mouseIsDownOnComp: false
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleShowDeleteButton = this.toggleShowDeleteButton.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)

    this.onMouseDown = this.onMouseDown.bind(this)
    this.pageClick = this.pageClick.bind(this)
  }

  public componentDidMount() {
    window.addEventListener('mousedown', this.pageClick, false)
  }

  public componentWillUnmount() {
    window.removeEventListener('mousedown', this.pageClick)
  }

  private toggleShowDeleteButton() {
    this.setState(prevState => ({
      showDeleteButton: !prevState.showDeleteButton
    }))
  }

  private handleDeleteClick() {
    const {
      shift,
      onRequestDelete
    } = this.props
    onRequestDelete(shift)

    this.setState({
      showDeleteButton: false
    })
  }

  /**
   * 
   * Figre out if clicked outside of the components
   * 
   */

  private onMouseDown() {
    this.setState({ mouseIsDownOnComp: true })
  }

  private onMouseUp() {
    this.setState({ mouseIsDownOnComp: false })
  }

  private pageClick() {
    if (this.state.mouseIsDownOnComp) { return }

    this.setState({
      showDeleteButton: false
    })
  }

  /**
   * 
   * Renderes
   * 
   */

  private durationAsString() {
    const { shift } = this.props
    const { duration } = shift

    const durationInHours = roundToTwo(duration / 60)
    const hour = durationInHours === 1 ? 'Hour' : 'Hours'

    return `${durationInHours} ${hour}`
  }

  public render() {
    const {
      shift,
      onRequestDelete
    } = this.props

    const {
      startTime,
      duration,
      location,
      client,
      employee,
    } = shift

    const {
      showDeleteButton
    } = this.state

    return (
      <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className={styles.container}>
        <div className={styles.itemsContainer}>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Date</label>
            <div className={styles.values}>{M(startTime).format('ddd, MMM Mo')}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Start Time</label>
            <div className={styles.values}>{M(startTime).format('hh:mmA')}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>End Time</label>
            <div className={styles.values}>{M(startTime).add(duration, 'minute').format('hh:mmA')}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Duration</label>
            <div className={styles.values}>{this.durationAsString()}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Client</label>
            <div className={styles.values}>{client}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Location</label>
            <div className={styles.values}>{location}</div>
          </div>

          <div className={styles.itemContainer}>
            <label className={styles.label}>Employee</label>
            <div className={styles.values}>{employee || "Open Shift"}</div>
          </div>

          {employee !== null && <div onClick={this.toggleShowDeleteButton} className={styles.showDelete}>
            {showDeleteButton ? ">" : "X"}
          </div>}

        </div>

        {showDeleteButton && <div onClick={this.handleDeleteClick} className={styles.delete}>Delete</div>}

      </div>
    )
  }
}


function roundToTwo(num: number): number {
  return +(Math.round(`${num}e+2` as any) + 'e-2')
}

