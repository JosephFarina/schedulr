import {
  RState,
} from 'src/models'

export const getNotificationMessages = (state: RState): string[] => state.ui.notification.messages
export const notificationIsSelected = (state: RState): boolean => (state.ui.notification.messages !== null)

