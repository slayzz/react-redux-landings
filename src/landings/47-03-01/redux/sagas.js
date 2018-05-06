import { all, fork } from 'redux-saga/effects';
import { createFormSaga } from 'common/components-containers/Form/redux/saga';

export default function* root() {
  yield all([
    fork(createFormSaga('47-03-01')),
  ]);
}
