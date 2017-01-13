import * as React from 'react'
import * as ReactModal from 'react-modal'

const styles = require('./Modal.css')
const ctx = require('classnames')

interface ModalProps {
  children?: React.ReactChildren
  onRequestClose?: Function
}

const defaultProps: ModalProps = {

}

const Modal: React.StatelessComponent<ModalProps> = (props: ModalProps) => {
  const {
    children,
    onRequestClose
  } = props

  const containerClass = ctx({
    [styles.container]: true
  })

  return (
    <ReactModal isOpen={true} onRequestClose={onRequestClose} shouldCloseOnOverlayClick={true}>
      {children}
    </ReactModal>
  )
}

Modal.defaultProps = defaultProps

export default Modal
