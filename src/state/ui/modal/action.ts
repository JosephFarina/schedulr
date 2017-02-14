import {
  Action,
  RModal,
} from 'src/models'

import {
  UIActions
} from 'src/state/actionTypes'

export function openNewShiftApprovalModal(): Action<RModal> {
  return {
    type: UIActions.showModal,
    payload: {
      modalType: 'shiftApproval',
      modalProps: {}
    }
  }
}

export function closeModal(): Action<RModal> {
  return {
    type: UIActions.hideModal,
    payload: null
  }
}
