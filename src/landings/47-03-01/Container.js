// @flow
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';

type Props = {
  store: Object
}

const Container = (props: Props) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

export default Container;
