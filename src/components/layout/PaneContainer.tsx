declare function require(s: any): any
import * as React from 'react';
import { Component, PropTypes } from 'react';

import CSSModules from 'react-css-modules';
const styles = require('./PaneContainer.css');

interface Props {
  children?: React.ReactChild
}

const PaneContainer = ({children = null}: Props) => {
  console.log(styles)
  return (
    <div className={styles.container}>
      {children}
    </div >
  );
}

export default PaneContainer
