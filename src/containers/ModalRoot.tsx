import * as React from 'react'
import { connect } from 'react-redux'

import ShiftApprover from './ShiftApprover'

import {
  ModalMode,
  RModal,
} from 'src/models'
import { getModalState } from 'src/state/ui/modal'

const MODAL_COMPONENTS: { [modalType: string]: any } = {
  'shiftApproval': ShiftApprover
}

export const ModalRoot = (props: RModal) => {
  const { modalType, modalProps } = props

  if (!modalType) {
    return null
  }


  const SpecificModal = MODAL_COMPONENTS[modalType]
  // const SpecificModal = ShiftApprover
  return <SpecificModal {...modalProps} />
}

export default connect(getModalState)(ModalRoot)
