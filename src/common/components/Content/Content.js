import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Content.scss';

const DEFAULT_CLASS_NAME = 'landing-content';
const DEFAULT_CLASS_WITH_IMAGE = 'landing-content--with-image';
const DEFAULT_CLASS_NAME_PART = 'landing-content__part';
const DIRECTION_HORIZONTALLY = 'horizontally';
const DIRECTION_VERTICALLY = 'vertically';

const addClassToChidren = (children) => {
  let childrenNumber = 0;
  const lengthOnChilds = React.Children.count(children);
  return React.Children.map(children, (child) => {
    childrenNumber += 1;
    if (childrenNumber === lengthOnChilds) {
      return child;
    }
    return React.cloneElement(child, { className: classNames(child.props.className, DEFAULT_CLASS_NAME_PART) });
  });
};

const Content = (props) => {
  const { children, direction, withImage } = props;
  return (
    <div
      className={!withImage ? DEFAULT_CLASS_NAME : DEFAULT_CLASS_WITH_IMAGE}
      style={{ flexDirection: direction === DIRECTION_HORIZONTALLY ? 'row' : 'column' }}
    >
      {addClassToChidren(children)}
    </div>
  );
};

export const ItemPropShape = PropTypes.shape({
  value: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

Content.defaultProps = {
  children: null,
  direction: 'horizontally',
  withImage: false,
};

Content.propTypes = {
  direction: PropTypes.oneOf([DIRECTION_HORIZONTALLY, DIRECTION_VERTICALLY]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  withImage: PropTypes.bool,
};

export default Content;
