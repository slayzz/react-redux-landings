// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { defaultState as defaultFormState } from 'common/components-containers/Form/redux/reducer';
import type { FormState } from 'common/components-containers/Form/redux/reducer';

import reducer from './reducer';
import sagas from './sagas';

type State = {
  +land: FormState
}

export default function (state: State = { land: { ...defaultFormState } }) {
  const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
    : compose;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    state,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(sagas);
  return store;
}
