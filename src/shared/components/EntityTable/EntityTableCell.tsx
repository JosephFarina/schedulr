import * as React from 'react'

import { Entity } from 'src/models'
const styles = require('./EntityTableCell.scss')

const Icon = require('antd/lib/icon')
const Input = require('antd/lib/input')
const Select = require('antd/lib/select')

interface Props {
  value?: string

  onChange?: (val: string) => any
  selectOptions?: Entity[]
}

interface State {
  editable?: boolean
  value?: string
}


const InputCell = ({value, handleChange, handleSubmit, handleExit}) => (
  <div className={styles.inputWrapper}>
    <Input
      value={value}
      onChange={handleChange}
      onPressEnter={handleSubmit}
    />
    <Icon
      type="check"
      className={styles.iconCheck}
      onClick={handleSubmit}
    />
    <Icon type="close" className={styles.iconClose}
      onClick={handleExit} />
  </div>
)

const SelectCell = ({value, handleChange, handleSubmit, handleExit, entities}) => (
  <div className={styles.inputWrapper}>
    <Select
      style={{ width: '100%' }}
      value={value}
      onChange={handleChange}
    >
      {entities.map(ent => <Select.Option value={ent.id}>{ent.alias}</Select.Option>)}

    </Select>
    <Icon
      type="check"
      className={styles.iconCheck}
      onClick={handleSubmit}
    />
    <Icon type="close" className={styles.iconClose}
      onClick={handleExit} />
  </div>
)

const TextCell = ({value, handleEditRequest}) => (
  <div className={styles.textWrapper}>
    {value || ' '}
    <Icon
      type="edit"
      className={styles.icon}
      onClick={handleEditRequest}
    />
  </div>
)



export class EntityTableCell extends React.Component<Props, State> {
  static defaultProps: Props = {
    selectOptions: null
  }

  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      value: this.props.value,
    }
  }

  handleChange = e => {
    const value = e.target ? e.target.value : e
    console.log(value)
    this.setState({ value })
  }

  handleSubmit = e => {
    this.setState({ editable: false })
    this.props.onChange(this.state.value)
  }

  handleExit = e => {
    this.setState({ editable: false })
  }

  edit = e => {
    this.setState({ editable: true, value: this.props.value })
  }

  render() {
    const {editable, value: stateValue } = this.state
    const {value: propsValue, selectOptions } = this.props
    return (
      <div className={styles.editableCell}>
        {
          editable ?
            selectOptions ?
              <SelectCell
                handleChange={this.handleChange}
                value={stateValue}
                entities={selectOptions}
                handleSubmit={this.handleSubmit}
                handleExit={this.handleExit}
              />
              :
              <InputCell
                handleChange={this.handleChange}
                value={stateValue}
                handleSubmit={this.handleSubmit}
                handleExit={this.handleExit}
              />
            :
            <TextCell
              handleEditRequest={this.edit}
              value={propsValue}
            />
        }
      </div>
    )
  }
}
