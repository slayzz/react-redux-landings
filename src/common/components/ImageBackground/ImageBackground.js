// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ImageBackground.scss';

const DEFAULT_CLASS_NAME = 'image-background';
const DEFAULT_CLASS_ITEM = 'image-background__item';

type Props = {
  className?: string,
  imgStyle?: PropTypes.object,
  style?: CSSStyleDeclaration,
  srcBackground?: string,
  srcImage?: string,
};

const ImageBackground = (props: Props) => {
  const { className, style, srcBackground, srcImage, imgStyle } = props;
  return (
    <div style={{ ...style, backgroundImage: srcBackground }} className={classNames(className, DEFAULT_CLASS_NAME)}>
      {!srcImage || <img style={imgStyle} className={DEFAULT_CLASS_ITEM} src={srcImage} alt="inner" />}
    </div>
  );
};

ImageBackground.defaultProps = {
  className: undefined,
  style: {},
  imgStyle: {},
  srcBackground: undefined,
  srcImage: undefined,
};

export default ImageBackground;
