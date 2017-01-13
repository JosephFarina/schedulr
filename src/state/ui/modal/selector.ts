import {
  RModal,
  RState,
} from 'src/models'

export const getModalState = (state: RState): RModal => state.ui.modal
