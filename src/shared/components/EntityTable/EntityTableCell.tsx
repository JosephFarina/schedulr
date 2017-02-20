import * as React from 'react'

const styles = require('./EntityTableCell.scss')

const Icon = require('antd/lib/icon')
const Input = require('antd/lib/input')

interface Props {
  value?: string

  onChange?: (val: string) => any
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
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      value: this.props.value
    }
  }

  handleChange = ({target}) => {
    const value = target.value
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
    const { editable, value: stateValue } = this.state
    const { value: propsValue } = this.props
    return (
      <div className={styles.editableCell}>
        {
          editable ?
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
