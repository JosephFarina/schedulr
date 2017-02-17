import * as React from 'react'
import { ReactWrapper } from 'enzyme'
import { Input } from 'src/shared/ui'

export function findInputFromInputComp(wrapper: ReactWrapper<any, any>, inputName: string) {
  return wrapper.find(Input).filterWhere(el => el.find(`[name="${inputName}"]`).exists()).find('input')
}
