import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './LandingContainer.scss';

const DEFAULT_CLASS_NAME = 'landing-container';

const LandingContanier = (props) => {
  const { children } = props;
  return <div className={classNames(DEFAULT_CLASS_NAME, 'content-container')}>{children}</div>;
};

LandingContanier.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LandingContanier;
