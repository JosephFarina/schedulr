import {
  RState,
} from 'src/models'

export const getNotificationMessages = (state: RState): string[] => state.ui.notification.messages
