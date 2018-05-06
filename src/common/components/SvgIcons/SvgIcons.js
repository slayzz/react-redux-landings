// @flow
import React from 'react';
import ReactSVG from 'react-svg';

import './SvgIcons.scss';

const DEFAULT_CLASS_NAME = 'svg-icons';
const DEFAULT_CLASS_ICON_CONTAINER = 'svg-icons__icon-container';
const DEFAULT_CLASS_ICON = 'svg-icons__icon';

type Props = {
  style?: CSSStyleDeclaration,
  icons?: Array<string>,
};

const SvgIcons = (props: Props) => {
  const { icons = [], style } = props;
  return (
    <div style={style} className={DEFAULT_CLASS_NAME}>
      {icons.map(iconPath => (
        <ReactSVG
          key={iconPath}
          path={iconPath}
          className={DEFAULT_CLASS_ICON_CONTAINER}
          svgClassName={DEFAULT_CLASS_ICON}
        />
      ))}
    </div>
  );
};

SvgIcons.defaultProps = {
  style: {},
  icons: [],
};

export default SvgIcons;
