// @flow
import * as React from 'react';
import classNames from 'classnames';
import * as R from 'ramda';
import RadioButton from 'common/components/RadioButtons/RadioButton';

import './RadioButtonsGroup.scss';

const DEFAULT_CLASS_NAME = 'radio-buttons-group';
const DEFAULT_CLASS_NAME_LABEL = 'radio-buttons-group__label';
const DEFAULT_CLASS_NAME_CONTAINER = 'radio-buttons-group__container';

export type Item = {
  value: string,
  id: string | number,
};

type Props = {
  className?: string,
  label?: string,
  value: Item,
  items: Array<Item>,
  onChange: Function,
  style?: CSSStyleDeclaration,
}

// TODO: Подумать над логикой отрисовки краев кнопок
class RadioButtonsGroup extends React.Component<Props> {
  static defaultProps = {
    className: undefined,
    onChange: undefined,
    label: undefined,
    value: undefined,
    style: {},
  };

  onChangeRadio = (event: SyntheticMouseEvent<HTMLElement>, data: Item) => {
    const { onChange } = this.props;
    onChange(data);
  };

  render() {
    const { items, className, label, value, style } = this.props;
    const innerClassnames = classNames(DEFAULT_CLASS_NAME, className);
    const checkedElementIndex = items.findIndex(item => R.equals(value, item));

    return (
      <div className={innerClassnames} style={{ ...style }}>
        {label ? <p className={DEFAULT_CLASS_NAME_LABEL}>{label}</p> : null}
        <div className={DEFAULT_CLASS_NAME_CONTAINER}>
          {items.map((item, i) => (
            <RadioButton
              key={item.id}
              position={i}
              itemsLength={items.length}
              checkedElementIndex={checkedElementIndex}
              checked={R.equals(value, item)}
              itemValue={item}
              isRenderRightBorder={i !== items.length - 1}
              onChange={this.onChangeRadio}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default RadioButtonsGroup;
