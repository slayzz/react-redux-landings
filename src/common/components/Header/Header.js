// @flow
import * as React from 'react';
import classNames from 'classnames';

import './Header.scss';

const DEFAULT_CLASS_NAME = 'landing-header';

export type Props = {
  style?: CSSStyleDeclaration,
  className?: string,
  text: string | React.Element<any>,
};


const Header = (props: Props) => {
  const { text, style, className } = props;
  return (
    <h1 className={classNames(DEFAULT_CLASS_NAME, className)} style={style}>
      {text}
    </h1>
  );
};

Header.defaultProps = {
  style: {},
  className: undefined,
};

export default Header;
