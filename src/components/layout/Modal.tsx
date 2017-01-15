import * as React from 'react'
import * as ReactModal from 'react-modal'

const styles = require('./Modal.css')
const ctx = require('classnames')

interface ModalProps {
  children?: React.ReactChildren
  onRequestClose?: Function
  fullScreen?: boolean
  title?: string
}

const defaultProps: ModalProps = {
  fullScreen: false,
  title: null
}

const Modal: React.StatelessComponent<ModalProps> = (props: ModalProps) => {
  const {
    children,
    onRequestClose,
    fullScreen,
    title
  } = props

  const containerClass = ctx({
    [styles.container]: true
  })

  const modalClass = ctx({
    [styles.modal]: true,
    [styles.fullScreen]: fullScreen
  })

  return (
    <ReactModal
      overlayClassName={styles.overlay}
      className={modalClass}
      isOpen={true}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}>
      {title && <div className={styles.header}>
        <h2>{title}</h2>
      </div>}
      {children}
    </ReactModal>
  )
}

Modal.defaultProps = defaultProps

export { Modal }
