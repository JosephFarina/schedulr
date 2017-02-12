import { combineReducers } from 'redux'

import shiftEditor from './editor/reducer'

const shift = combineReducers({
  editor: shiftEditor
})

export default shift

export * from './editor/selector'
export * from './editor/action'
export * from './editor/validator'
