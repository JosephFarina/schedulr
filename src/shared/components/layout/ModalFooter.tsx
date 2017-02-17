import * as React from 'react'

const styles = require('./Modal.css')
const ctx = require('classnames')

interface ModalFooterMProps {
  children?: React.ReactChildren
}

interface ModalHeaderProps {
  children?: React.ReactChildren
}

const defaultProps: ModalFooterMProps = {

}

const ModalFooter: React.StatelessComponent<ModalFooterMProps> = ({children}: ModalFooterMProps) => (
  <div className={styles.footerContainer}>
    <div className={styles.footerInnerContainer}>
      {children}
    </div>
  </div>
)


const ModalHeader: React.StatelessComponent<ModalHeaderProps> = ({children}: ModalHeaderProps) => (
  <div>
    {children}
  </div>
)


ModalFooter.defaultProps = defaultProps

export { ModalFooter, ModalHeader }
