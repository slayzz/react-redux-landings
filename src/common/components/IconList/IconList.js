// @flow
import React from 'react';
import classNames from 'classnames';

import './IconList.scss';

const DEFAULT_CLASS_NAME = 'icon-list';
const DEFAULT_CLASS_ITEM = 'icon-list__item';
const DEFAULT_CLASS_ITEM_ICON = 'icon-list__image';
const DEFAULT_CLASS_ITEM__HEAD_TEXT = 'icon-list__head-text';
const DEFAULT_CLASS_ITEM_OTHER_TEXT = 'icon-list__other-text';

type IconItem = {
  headText: string,
  otherText?: string,
  image: string,
};

type Props = {
  style?: CSSStyleDeclaration,
  items?: Array<IconItem>,
};

const IconList = (props: Props) => {
  const { items = [], style } = props;
  return (
    <div className={DEFAULT_CLASS_NAME} style={style}>
      {items.map((item, i) => (
        <div key={item.headText} className={classNames(DEFAULT_CLASS_ITEM)}>
          {!item.image || <img src={item.image} alt={`content-${i}`} className={DEFAULT_CLASS_ITEM_ICON} />}
          <p className={DEFAULT_CLASS_ITEM__HEAD_TEXT}>{item.headText}</p>
          {!item.otherText || <p className={DEFAULT_CLASS_ITEM_OTHER_TEXT}>{item.otherText}</p>}
        </div>
      ))}
    </div>
  );
};

IconList.defaultProps = {
  style: {},
  items: [],
};

export default IconList;
