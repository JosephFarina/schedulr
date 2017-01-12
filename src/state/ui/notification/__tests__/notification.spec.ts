import {
  RNotification
} from 'src/models'

import notification from './../reducer'

import {
  resetNotifications,
  setMessagesToAlert,
} from './../'

describe('Alert UI', () => {

  it('#setMessagesToAlert', () => {
    const messages = [
      'first message',
      'second message',
      'third message'
    ]
    const state = notification(undefined, setMessagesToAlert(messages))
    expect(state).toEqual(jasmine.objectContaining({
      messages
    }))
  })

  it('#resetNotifictions', () => {
    const initialState: RNotification = {
      messages: [
        'asdfdvffa',
        'asrfvfdewdsvf'
      ]
    }

    const expectedState: RNotification = {
      messages: null
    }

    const state = notification(initialState, resetNotifications())
    expect(state).toEqual(expectedState)

  })

})
