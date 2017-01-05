import * as React from 'react'
import {
  MapStateToProps,
  connect,
} from 'react-redux'

import {
  RState,
  ScheduleSidebarMode,
  Shift
} from './../models'

import Button from './../components/buttons/Button'
import ButtonGroup from './../components/buttons/ButtonGroup'
import AutoComplete from './../components/inputs/AutoComplete'
import Input from './../components/inputs/Input'

interface Props {
  dispatch?: Function
  editMode?: boolean // mode === 'editMode'
  newMode?: boolean // mode ==='newMode'
  shift?: Shift // shiftToEdit -- only use this in the constructor use internal state after
  shiftSelected?: boolean

  handleSubmit?(): void // create new shift or edit shift depending on the mode 
  handleReset?(): void// clear the new shift blank or restore the unedited shift being edited 
  handleModeChange?(mode: ScheduleSidebarMode): void // toggle between edit and add state
  handleChange?(shift: Shift): void // on change end update redux
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
    shiftSelected,
    editMode,
    newMode,
  } = props

  if (shiftSelected) {
    return (
      <ButtonGroup centered={true}>
        <Button onClick={() => handleModeChange('newShift')} active={newMode} mini={true} >New</Button>
        <Button onClick={() => handleModeChange('editShift')} active={editMode} mini={true} >Edited</Button>
      </ButtonGroup>
    )
  } else {
    return null
  }
}

const ShiftEditor: React.StatelessComponent<Props> = (props: Props) => {
  return <div>
    {generateModeChange(props)}
    <AutoComplete label={"La"} value={""} onChange={() => { } } />
    <Input onChangeEnd={() => { console.log('change end') } } label={"La"} value={""} onChange={() => { } } />
    <Input label={"La"} value={""} onChange={() => { } } />
    <Input label={"La"} value={""} onChange={() => { } } />
    <Input label={"La"} value={""} onChange={() => { } } />
    <Input label={"La"} value={""} onChange={() => { } } />
  </div>
}

ShiftEditor.defaultProps = defaultProps

const mapStateToProps: MapStateToProps<any, any> = (state: RState, ownProps: Props) => {
  return {}
}

// export default connect(mapStateToProps)(ShiftEditor)
export default ShiftEditor
