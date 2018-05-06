// @flow
import * as React from 'react';
import classNames from 'classnames';

import './TopComponent.scss';

const DEFAULT_CLASS_NAME = 'top-component';
const DEFAULT_CLASS_RIGHT = 'top-component__right-block';
const DEFAULT_CLASS_LEFT = 'top-component__left-block';

export type Props = {
  style?: CSSStyleDeclaration,
  leftBlock: React.Element<any>,
  rightBlock: React.Element<any>,
};

const TopComponent = (props: Props) => {
  const { leftBlock, rightBlock, style } = props;
  const { className: classNameLeftBlock } = leftBlock.props;
  const { className: classNameRightBlock } = rightBlock.props;
  const leftBlockWithClass = React.cloneElement(leftBlock, {
    className: classNames(classNameLeftBlock, DEFAULT_CLASS_LEFT),
  });
  const rightBlockWithClass = React.cloneElement(rightBlock, {
    className: classNames(classNameRightBlock, DEFAULT_CLASS_RIGHT),
  });

  return (
    <div className={DEFAULT_CLASS_NAME} style={style}>
      {leftBlockWithClass}
      {rightBlockWithClass}
    </div>
  );
};

TopComponent.defaultProps = {
  style: {},
};

export default TopComponent;
