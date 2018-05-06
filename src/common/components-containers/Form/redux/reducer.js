// @flow
import { handleActions } from 'redux-actions';
import { formActionCreator } from 'common/components-containers/Form/redux/actions';

export const defaultState = { form: { values: {}, validation: {}, submited: false, touched: {}, isValid: false } };

export type Values = {
  [string]: any
};

export type Validation = {
  [string]: string
};

export type Touched = {
  [string]: boolean
};

export type FormValues = {
  +values: { [string]: any },
  +validation: { [string]: string },
  +submited: boolean,
  +touched: { [string]: boolean },
  +isValid: boolean,
};

export type FormState = {
  +form: FormValues,
};

const init = (state: FormState, action) => {
  const { values } = action.payload;
  const { form } = state;
  return {
    ...state,
    form: {
      ...form,
      values,
      submited: false,
    },
  };
};

const change = (state: FormState, action) => {
  const { name, value, validation } = action.payload;
  const { form } = state;
  const { values, touched } = form;
  return {
    ...state,
    form: {
      ...form,
      values: {
        ...values,
        [name]: value,
      },
      submited: false,
      validation,
      touched: {
        ...touched,
        [name]: true,
      },
    },
  };
};

const submitSuccess = (state: FormState) => {
  const { form } = state;
  return {
    ...state,
    form: {
      ...form,
      submited: false,
    },
  };
};

const submitFail = (state: FormState, action) => {
  const { validation } = action.payload;
  const { form } = state;
  return {
    ...state,
    form: {
      ...form,
      validation,
      submited: false,
    },
  };
};

const createFormReducer = (actionName: string, innerDefaultState: FormState = defaultState) => {
  const actionsLanding = formActionCreator(actionName);
  return handleActions(
    {
      [actionsLanding.formInit]: init,
      [actionsLanding.formChange]: change,
      [actionsLanding.formSubmitSuccess]: submitSuccess,
      [actionsLanding.formSubmitFail]: submitFail,
    },
    innerDefaultState,
  );
};

export default createFormReducer;
