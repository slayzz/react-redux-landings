import { all, fork, put, take } from 'redux-saga/effects';
import { formActionCreator } from 'common/components-containers/Form/redux/actions';
import isValidated from 'common/components-containers/Form/helpers/helper';
import { RegistrationModel } from 'common/components-containers/Form/helpers/registration';

const sendForm = (values) => {
  const registration = new RegistrationModel(RegistrationModel.FORM_2_P);
  registration
    .setPassword(values.password)
    .setEmail(values.email)
    .setCurrency(values.currency.id)
    .setRules(values.agreement);
  registration.execute();
};

export const createSubmitSagasHandler = name =>
  function* submit() {
    while (true) {
      const formActions = formActionCreator(name);
      const {
        payload: { values, validation },
      } = yield take(formActions.formSubmit);
      try {
        const isValid = isValidated(validation);
        if (isValid) {
          sendForm(values);
          yield put(formActions.formSubmitSuccess({ data: 'OK' }));
        } else {
          yield put(formActions.formSubmitFail({ error: 'NOT_VALID', validation }));
        }
      } catch (error) {
        yield put(formActions.formSubmitFail({ error, validation }));
      }
    }
  };

export const createFormSaga = name =>
  function* form() {
    yield all([fork(createSubmitSagasHandler(name))]);
  };
