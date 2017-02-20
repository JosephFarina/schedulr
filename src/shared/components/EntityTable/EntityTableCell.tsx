import * as React from 'react'

import { Entity } from 'src/models'
const styles = require('./EntityTableCell.scss')

const Icon = require('antd/lib/icon')
const Input = require('antd/lib/input')
const Select = require('antd/lib/select')

/**
 * 
 * Table Cell Helper Components
 * 
 */

interface InputCellProps {
  value: string
  handleChange: (val: any) => void
  handleSubmit: (val: any) => void
  handleExit: (val: any) => void
  hasBeenEdited: boolean
  selectOptions: Entity[]
  children?: any
}

const EditIcons = ({handleSubmit, handleExit, hasBeenEdited}: InputCellProps) => (
  <span>
    {hasBeenEdited && <Icon
      type="check"
      className={styles.iconCheck}
      onClick={handleSubmit}
    />}
    <Icon type="close" className={styles.iconClose}
      onClick={handleExit} />
  </span>
)

const InputWrapper = (props: InputCellProps) => (
  <div className={styles.inputWrapper}>
    {props.children}
    <EditIcons {...props} />
  </div>
)

const InputCell = (props: InputCellProps) => {
  const {value, handleChange, handleSubmit} = props
  return (
    <InputWrapper {...props}>
      <Input
        value={value}
        onChange={handleChange}
        onPressEnter={handleSubmit}
      />
    </InputWrapper>
  )
}

const SelectCell = (props: InputCellProps) => {
  const {value, handleChange, selectOptions} = props
  return (
    <InputWrapper {...props}>
      <Select
        style={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        children={selectOptions.map(ent => <Select.Option value={ent.id}>{ent.alias}</Select.Option>)}
      />
    </InputWrapper>
  )
}


interface TextCellProps {
  value: string
  handleEditRequest: (val: any) => any
}

const TextCell = (props: TextCellProps) => (
  <div className={styles.textWrapper}>
    {props.value || ' '}
    <Icon
      type="edit"
      className={styles.icon}
      onClick={props.handleEditRequest}
    />
  </div>
)

const InputType = (props: InputCellProps) => props.selectOptions ? <SelectCell {...props} /> : <InputCell {...props} />


/**
 * 
 * Table Cell
 * 
 */


interface Props {
  value?: string
  onChange?: (val: string) => any
  selectOptions?: Entity[]
}

interface State {
  editable?: boolean
  value?: string
  hasBeenEdited?: boolean
}

export class EntityTableCell extends React.Component<Props, State> {
  static defaultProps: Props = {
    selectOptions: null,
    value: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      value: this.props.value,
      hasBeenEdited: false
    }
  }

  handleChange = e => {
    const value = e.target ? e.target.value : e
    this.setState({ value, hasBeenEdited: true })
  }

  resetToText() {
    this.setState({ editable: false, value: '' })
  }

  handleSubmit = e => {
    this.props.onChange(this.state.value)
    this.resetToText()
  }

  handleEditRequest = e => {
    this.setState({ editable: true, value: this.props.value, hasBeenEdited: false })
  }

  render() {
    return (
      <div className={styles.editableCell}>
        {
          this.state.editable ?
            <InputType
              value={this.state.value}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleExit={this.resetToText}
              hasBeenEdited={this.state.hasBeenEdited}
              selectOptions={this.props.selectOptions}
            />
            :
            <TextCell
              handleEditRequest={this.handleEditRequest}
              value={this.props.value}
            />
        }
      </div>
    )
  }
}
