// @flow
import React from 'react';

import './FooterText.scss';

const DEFAULT_CLASS_NAME = 'footer-text';
const DEFAULT_CLASS_TEXT = 'footer-text__text';

type Props = {
  children: string,
  style?: CSSStyleDeclaration,
};

const FooterText = (props: Props) => {
  const { children, style } = props;
  return (
    <div style={style} className={DEFAULT_CLASS_NAME}>
      <p className={DEFAULT_CLASS_TEXT}>{children}</p>
    </div>
  );
};

FooterText.defaultProps = {
  style: {},
};

export default FooterText;
