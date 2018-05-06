// @flow
import React from 'react';
import classNames from 'classnames';

import './BenefitList.scss';

const DEFAULT_CLASS_NAME = 'benefit-list';
const DEFAULT_CLASS_NAME_ITEM = 'benefit-list__item';

type BenefitListProps = {
  items?: Array<string>,
  className?: string,
  itemClassName?: string
};

const renderItems = (items: Array<string> = [], itemClassName: string = '') => items.map(item => (
  <li key={`benefit-list-item-${Math.random() * 10}`} className={classNames(DEFAULT_CLASS_NAME_ITEM, itemClassName)}>
    {item}
  </li>
));

const BenefitList = (props: BenefitListProps) => {
  const { items, className, itemClassName } = props;
  return (
    <ul className={classNames(DEFAULT_CLASS_NAME, className)}>
      {renderItems(items, itemClassName)}
    </ul>
  );
};

BenefitList.defaultProps = {
  items: [],
  className: undefined,
  itemClassName: undefined,
};

export default BenefitList;
