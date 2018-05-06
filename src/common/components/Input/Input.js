import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

const DEFAULT_CLASS_NAME = 'input-landing';
const DEFAULT_CLASS_NAME_INVALID = 'input-landing--invalid';
const DEFAULT_CLASS_NAME_LABEL = 'input-landing__label';
const DEFAULT_CLASS_NAME_INPUT = 'input-landing__input';
const DEFAULT_CLASS_NAME_PASSWORD = 'input-landing__input--password';
const DEFAULT_CLASS_NAME_INPUT_HAS_VALUE = 'input-landing__input--has-value';

class Input extends Component {
  handleChangeValue = (event) => {
    const { onChange } = this.props;
    const { target } = event;
    const { value: changedValue } = target;
    return onChange(changedValue);
  };

  focus = () => {
    this.input.focus();
  };

  render() {
    const { className, placeholder, style, value, validation, onFocus, onBlur, onKeyUp, type } = this.props;
    const isEmptyValue = !value;

    return (
      <div
        style={style}
        className={classNames(className, DEFAULT_CLASS_NAME, { [DEFAULT_CLASS_NAME_INVALID]: !!validation })}
      >
        <input
          ref={(el) => {
            this.input = el;
          }}
          value={value}
          onChange={this.handleChangeValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          className={classNames(DEFAULT_CLASS_NAME_INPUT, {
            [DEFAULT_CLASS_NAME_INPUT_HAS_VALUE]: !isEmptyValue,
            [DEFAULT_CLASS_NAME_PASSWORD]: type === 'password',
          })}
        />
        <label className={DEFAULT_CLASS_NAME_LABEL}>{placeholder}</label>
      </div>
    );
  }
}

Input.defaultProps = {
  className: undefined,
  style: {},
  placeholder: 'input',
  value: '',
  validation: null,
  onFocus: undefined,
  onBlur: undefined,
  onKeyUp: undefined,
  type: 'text',
};

Input.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password']),
  value: PropTypes.string,
  validation: PropTypes.any, // eslint-disable-line
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
};

export default Input;
