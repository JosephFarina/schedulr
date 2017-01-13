import * as React from 'react'
import { connect } from 'react-redux'

import Modal from 'src/components/layout/Modal'

import {
  closeModal
} from 'src/state/ui/modal'

// const styles = require('./ShiftApproIver.css')
const ctx = require('classnames')

interface ShiftApproverProps {
  dispatch?: Function
}

interface ShiftApproverState {

}

class ShiftApprover extends React.Component<ShiftApproverProps, ShiftApproverState> {
  public static defaultProps: ShiftApproverProps = {

  }

  constructor(props: ShiftApproverProps) {
    super(props)

    this.closeModal = this.closeModal.bind(this)
  }

  public closeModal() {
    const { dispatch } = this.props
    dispatch(closeModal())
  }

  public render() {
    const {

    } = this.props

    const className = ctx({

    })

    return (
      <Modal onRequestClose={this.closeModal}>
        m a shft approver
      </Modal>
    )
  }
}

export default connect()(ShiftApprover)
