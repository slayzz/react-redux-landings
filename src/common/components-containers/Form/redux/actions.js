// @flow
import { createAction } from 'redux-actions';
import * as R from 'ramda';
import type { Values, Validation } from 'common/components-containers/Form/redux/reducer';

type AbstractAction = {
  +type: string,
};

export type InitAction = AbstractAction & {
  +values: Values,
  +validation: Validation
};

export type ChangeAction = AbstractAction & {
  +name: string,
  +value: Values,
  +validation: Validation
};

export type SubmitAction = AbstractAction & {
  +values: Values,
  +validation: Validation
}

export const formInit = (whoCall: string) =>
  createAction(`FORM/INIT/${whoCall}`, (values, validation) => ({ values, validation }));

export const formChange = (whoCall: string) => createAction(`FORM/CHANGE/${whoCall}`, R.identity);

export const formSubmit = (whoCall: string) =>
  createAction(`FORM/SUBMIT/${whoCall}`, (values, validation) => ({ values, validation }));

export const formSubmitSuccess = (whoCall: string) => createAction(`FORM/SUBMIT/${whoCall}_SUCCESS`, R.identity);

export const formSubmitFail = (whoCall: string) => createAction(`FORM/SUBMIT/${whoCall}_FAIL`, R.identity);

export const formActionCreator = (whoCall: string) => ({
  formInit: formInit(whoCall),
  formChange: formChange(whoCall),
  formSubmit: formSubmit(whoCall),
  formSubmitSuccess: formSubmitSuccess(whoCall),
  formSubmitFail: formSubmitFail(whoCall),
});
