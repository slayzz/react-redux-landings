// @flow
import React from 'react';
import classNames from 'classnames';
import type { Item } from 'common/components/RadioButtons/RadioButtonsGroup';

import './RadioButtonsGroup.scss';

const DEFAULT_CLASS_NAME = 'radio-buttons-group__radio-button';
const DEFAULT_CLASS_NAME_CHECKED = 'radio-buttons-group__radio-button--checked';
const DEFAULT_CLASS_NAME_RIGHT_BORDER = 'radio-buttons-group__right-border';

const DEFAULT_CLASS_NAME_NORIGHTBORDER = 'radio-buttons-group__radio-button--noright-border';
const DEFAULT_CLASS_NAME_NOLEFTBORDER = 'radio-buttons-group__radio-button--noleft-border';

const BORDER_RIGHT = <div className={DEFAULT_CLASS_NAME_RIGHT_BORDER} />;

type Props = {
  className?: string,
  itemValue: Item,
  onChange: Function,
  checked: boolean,
  itemsLength: number,
  position: number,
  checkedElementIndex: number,
};

// const borderLogic = (props: Props) => {
const borderLogic = (position: number, itemsLength: number, checked: boolean, checkedElementIndex: number) => {
  if (checked) {
    return BORDER_RIGHT;
  } else if (position === itemsLength - 1) {
    return null;
  } else if (position === checkedElementIndex - 1) {
    return null;
  }
  if (position === checkedElementIndex + 1) {
    return BORDER_RIGHT;
  }
  return BORDER_RIGHT;
};

const borderRadiusLogic = (position: number, itemsLength: number, checked: boolean) => {
  let radioClassBorder = null;
  if (position === 0 && checked) {
    radioClassBorder = classNames(radioClassBorder, DEFAULT_CLASS_NAME_NORIGHTBORDER);
    return radioClassBorder;
  }
  if (position === itemsLength - 1 && checked) {
    radioClassBorder = classNames(radioClassBorder, DEFAULT_CLASS_NAME_NOLEFTBORDER);
    return radioClassBorder;
  }
  if (checked) {
    radioClassBorder = classNames(radioClassBorder, DEFAULT_CLASS_NAME_NOLEFTBORDER, DEFAULT_CLASS_NAME_NORIGHTBORDER);
    return radioClassBorder;
  }
  return radioClassBorder;
};

const RadioButton = (props: Props) => {
  const { itemValue, onChange, className, checked, position, itemsLength, checkedElementIndex } = props;
  const { value } = itemValue;

  const onClick = (event) => {
    onChange(event, itemValue);
  };

  const rightBorder = borderLogic(position, itemsLength, checked, checkedElementIndex);
  const radioClass = borderRadiusLogic(position, itemsLength, checked);

  const innerClassNames = classNames(DEFAULT_CLASS_NAME, className, radioClass, {
    [DEFAULT_CLASS_NAME_CHECKED]: checked,
  });
  return (
    <div onClick={onClick} className={innerClassNames}>
      <span style={{ verticalAlign: 'text-top' }}>{value}</span>
      {rightBorder}
    </div>
  );
};

RadioButton.defaultProps = {
  className: undefined,
};

export default RadioButton;
