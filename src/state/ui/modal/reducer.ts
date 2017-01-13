import {
  Action,
  RModal,
} from 'src/models'

import {
  UIActions
} from 'src/state/actionTypes'

const initialState: RModal = {
  modalType: null,
  modalProps: {}
}

function modal(state = initialState, action: Action<RModal>) {
  switch (action.type) {
    case UIActions.showModal:
      return Object.assign({}, action.payload)

    case UIActions.hideModal:
      return initialState

    default:
      return state
  }
}

export default modal
