// @flow
import * as React from 'react';
import classNames from 'classnames';
import * as R from 'ramda';

import './Button.scss';

const DEFAULT_CLASS_NAME = 'button-landing';
const DEFAULT_CLASS_BUTTON = 'button-landing__button';
const DEFAULT_CLASS_TEXT = 'button-landing__text';

/* eslint-disable */
type Props = {
  children?: string,
  textStyle?: CSSStyleDeclaration,
  onClick: Function,
  icon?: string,
};
/* eslint-enable */

export class Button extends React.Component<Props> {
  static defaultProps = {
    children: '',
    textStyle: {},
    icon: undefined,
  };

  constructor(props) {
    super(props);
    this.typeElement = 'button';
  }

  getTypeOfElement() {
    return this.typeElement;
  }

  getIcon() {
    const { icon } = this.props;
    return !icon || <img key="button-icon" src={icon} alt="button-icon" />;
  }

  prepare() {
    const { children } = this.props;
    return this.renderButtonElement({ ...this.props }, children);
  }

  renderButtonElement(props: Props, children: string) {
    const { className, textStyle, onClick } = props;
    const innerChildren = children
      ? [
        this.getIcon(),
        <span key="text" className={DEFAULT_CLASS_TEXT} style={textStyle}>
          {children}
        </span>,
      ]
      : undefined;
    return (
      <div className={DEFAULT_CLASS_NAME}>
        {React.createElement(
          this.getTypeOfElement(),
          { ...R.omit(['textStyle'], props), onClick, className: classNames(DEFAULT_CLASS_BUTTON, className) },
          innerChildren,
        )}
      </div>
    );
  }

  render() {
    return this.prepare();
  }
}

export class InputButton extends Button {
  constructor(props) {
    super(props);
    this.typeElement = 'input';
  }

  prepare() {
    const { children } = this.props;
    return this.renderButtonElement({
      ...this.props,
      type: 'submit',
      value: children,
    });
  }
}

export class AButton extends Button {
  constructor(props) {
    super(props);
    this.typeElement = 'a';
  }

  prepare() {
    const { children } = this.props;
    return this.renderButtonElement({ ...this.props, className: 'button-landing' }, children);
  }
}
