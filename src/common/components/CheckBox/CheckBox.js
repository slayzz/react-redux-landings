import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CheckBox.scss';

const DEFAULT_CLASS_NAME = 'check-box';
const DEFAULT_CLASS_NAME_SPAN = 'check-box__span';
const DEFAULT_CLASS_NAME_SPAN_INVALID = 'check-box__span--invalid';
const DEFAULT_CLASS_NAME_SPAN_CHECKED = 'check-box__span--checked';
const DEFAULT_CLASS_NAME_SPAN_TEXT = 'check-box__text';

class CheckBox extends Component {
  changeHandle = (event) => {
    const { onChange } = this.props;
    const { target } = event;
    const dataCheckedValue = target.getAttribute('data-checked') === 'true';
    onChange(!dataCheckedValue);
  };

  render() {
    const { children, value, validation } = this.props;

    const childrenWrapped = React.cloneElement(children, {
      className: DEFAULT_CLASS_NAME_SPAN_TEXT,
      onClick: this.changeHandle,
      'data-checked': value,
    });
    const spanClassName = classNames(DEFAULT_CLASS_NAME_SPAN, { [DEFAULT_CLASS_NAME_SPAN_CHECKED]: value });

    return (
      <div className={DEFAULT_CLASS_NAME}>
        <span
          data-checked={value}
          onClick={this.changeHandle}
          className={classNames(spanClassName, { [DEFAULT_CLASS_NAME_SPAN_INVALID]: validation })}
        />
        {childrenWrapped}
      </div>
    );
  }
}

export const ItemPropShape = PropTypes.shape({
  value: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

CheckBox.defaultProps = {
  value: false,
  children: undefined,
  validation: undefined,
};

CheckBox.propTypes = {
  value: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.string,
};

export default CheckBox;
