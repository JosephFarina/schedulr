import { combineReducers } from 'redux'

import shiftEditor from './editor/reducer'

const shift = combineReducers({
  editor: shiftEditor
})

export default shift

import * as Editor from './editor'

export {
  Editor
}

