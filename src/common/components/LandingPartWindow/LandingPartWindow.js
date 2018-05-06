// @flow
import * as React from 'react';
import classNames from 'classnames';

import './LandingPartWindow.scss';

const DEFAULT_CLASS_NAME = 'landing-part-window';
const DEFAULT_CLASS_FOOTER = 'landing-part-window--footer';

export type Props = {
  style?: CSSStyleDeclaration,
  wrapperType: 'section' | 'div' | 'footer' | 'header',
  children?: React.Element<any>,
};

const LandingPartWindow = (props: Props) => {
  const { children, style, wrapperType } = props;
  switch (wrapperType) {
    case 'header':
      return (
        <header className={DEFAULT_CLASS_NAME} style={style}>
          {children}
        </header>
      );
    case 'section':
      return (
        <section className={DEFAULT_CLASS_NAME} style={style}>
          {children}
        </section>
      );
    case 'footer':
      return (
        <footer className={classNames(DEFAULT_CLASS_NAME, DEFAULT_CLASS_FOOTER)} style={style}>
          {children}
        </footer>
      );
    default:
      return (
        <div className={DEFAULT_CLASS_NAME} style={style}>
          {children}
        </div>
      );
  }
};

LandingPartWindow.defaultProps = {
  style: {},
  wrapperType: 'div',
  children: null,
};

export default LandingPartWindow;
