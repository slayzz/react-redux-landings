import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/fonts/_index.scss';
import 'styles/normalize/_index.scss';
import 'react-tippy/dist/tippy.css';

import configureStore from './redux/configureStore';
import Container from './Container';


const store = configureStore();
if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<Container store={store} />, document.getElementById('root'));
} else {
  ReactDOM.hydrate(<Container store={store} />, document.getElementById('root'));
}
