import * as React from 'react'

import {
  ScheduleSidebarMode,
  Shift
} from './../../models'

interface Props {
  editMode: boolean // mode === 'editMode'
  newMode: boolean // mode ==='newMode'
  shift: Shift // shiftToEdit -- only use this in the constructor use internal state after
  shiftSelected: boolean

  handleSubmit(): void // create new shift or edit shift depending on the mode 
  handleReset(): void// clear the new shift blank or restore the unedited shift being edited 
  handleModeChange(mode: ScheduleSidebarMode): void // toggle between edit and add state
  handleChange(shift: Shift): void // on change end update redux
}

const defaultProps: Props = {
  shift: null,
  shiftSelected: false,
  handleChange: () => { },
  handleModeChange: () => { },
  handleReset: () => { },
  handleSubmit: () => { },
  editMode: false,
  newMode: true
}

function generateModeChange(props: Props) {
  const {
    handleModeChange,
    shiftSelected
  } = props

  if (shiftSelected) {
    return (
      <div>
        <button>Edit</button>
        <button>New</button>
      </div>
    )
  } else {
    return null
  }
}

const ShiftEditor: React.StatelessComponent<Props> = (props: Props) => {
  return <div>
    <label htmlFor="input">Employee</label>
    <input type="text" />
  </div>
}

ShiftEditor.defaultProps = defaultProps

export default ShiftEditor
