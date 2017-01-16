import * as React from 'react'

const styles = require('./Modal.css')
const ctx = require('classnames')

interface ModalFooterMProps {
  children?: React.ReactChildren
}

const defaultProps: ModalFooterMProps = {

}

const ModalFooter: React.StatelessComponent<ModalFooterMProps> = (props: ModalFooterMProps) => {
  const {
    children
  } = props

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerInnerContainer}>
        {children}
      </div>
    </div>
  )
}

ModalFooter.defaultProps = defaultProps

export { ModalFooter }
