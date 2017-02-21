import * as React from 'react'

import { } from 'src/models'
import { connect } from 'react-redux'

// const styles = require('./NewEmployee.scss')
const ctx = require('classnames')

const Input = require('antd/lib/input')
const Icon = require('antd/lib/icon')
const Select = require('antd/lib/select')
const Button = require('antd/lib/button')
const Form = require('antd/lib/form')
const Popover = require('antd/lib/popover')
const FormItem = Form.Item

interface Props {
  dispatch?: Function
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const NewEmployee = Form.create()(React.createClass({
  componentDidMount() {
    this.props.form.validateFields()
  },
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
    })
  },
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form

    const aliasError = isFieldTouched('alias') && getFieldError('alias')
    const emailError = isFieldTouched('email') && getFieldError('email')

    return <Popover placement="bottom" content={<Form  onSubmit={this.handleSubmit}>
      <FormItem
        validateStatus={aliasError ? 'error' : ''}
        hasFeedback
        help={aliasError || ''}
      >
        {getFieldDecorator('alias', {
          rules: [{ required: true, message: 'Please input a name!' }]
        })(
          <Input addonBefore={<Icon type="user" />} placeholder="Name" />
          )}
      </FormItem>

      <FormItem
        validateStatus={emailError ? 'error' : ''}
        help={emailError || ''}
        hasFeedback
      >
        {getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'The input is not valid Email!',
          }, {
            required: true, message: 'Please input your Email!',
          }],
        })(
          <Input addonBefore={<Icon type="mail" />} placeholder="Email" />
          )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('position', {
          rules: [{
            required: true, message: 'Please add a position'
          }],
        })(
          <Select />
          )}
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >Create</Button>
      </FormItem>
    </Form>}
    >
      <Button>Open</Button>
    </Popover>
  }
}))

const defaultProps: Props = {

}

NewEmployee.defaultProps = defaultProps

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps)(NewEmployee)
