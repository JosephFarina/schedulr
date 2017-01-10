import {
  RAlert,
  RState,
} from 'src/models'

export const getAlertInfo = (state: RState): RAlert => state.ui.alert
