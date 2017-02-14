import * as React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
} from 'src/shared/components'

import { ShiftPreview } from './../components'

import {
  closeModal
} from 'src/state/ui/modal'

import {
  getGeneratedShifts,
  removeEmployeeFromShift,
  resetShiftEditor
} from 'src/state/shift'

import {
  addShifts
} from 'src/state/entities'

import {
  RState,
  Shift
} from 'src/models'

// const styles = require('./ShiftApproIver.css')
const ctx = require('classnames')

interface ShiftApproverProps {
  dispatch?: Function
  shifts: Shift[]
}

interface ShiftApproverState {

}

class ShiftApprover extends React.Component<ShiftApproverProps, ShiftApproverState> {
  public static defaultProps: ShiftApproverProps = {
    shifts: []
  }

  constructor(props: ShiftApproverProps) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
    this.removeShiftFromEditor = this.removeShiftFromEditor.bind(this)
    this.addShifts = this.addShifts.bind(this)
  }

  private addShifts() {
    const { dispatch, shifts } = this.props
    dispatch(addShifts(shifts))
    dispatch(resetShiftEditor())
    this.closeModal()
  }

  public closeModal() {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  private removeShiftFromEditor(shift: Shift) {
    const { dispatch } = this.props
    dispatch(removeEmployeeFromShift(shift.employee))
  }

  public render() {
    const {
      shifts
    } = this.props

    return (
      <Modal title={`${shifts.length} Shift${shifts.length === 1 ? '' : 's'} To Approve`} onRequestClose={this.closeModal}>
        <div>
          {shifts.map((shift, i) => <ShiftPreview key={i} shift={shift} onRequestDelete={this.removeShiftFromEditor} />)}
        </div>
        <ModalFooter>
          <ButtonGroup justified={true}>
            <Button onClick={this.closeModal} block={true}>Cancel</Button>
            <Button onClick={this.addShifts} block={true}>Generate</Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = (state: RState) => {
  return {
    shifts: getGeneratedShifts(state)
  }
}

export default connect(mapStateToProps)(ShiftApprover)
