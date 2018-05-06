// @flow
import * as React from 'react';
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { getFormState } from 'common/components-containers/Form/redux/selectors';
import * as actions from 'common/components-containers/Form/redux/actions';
import type { FormState } from 'common/components-containers/Form/redux/reducer';

import './Form.scss';

const DEFAULT_CLASS_NAME = 'landing-form';

type Props = {
  children: Function,
  className: string,
  pathToStore: Array<string>, // eslint-disable-line
  formInit: Function,
  formChange: Function,
  formSubmit: Function,
  form: FormState,
  validators: Array<Function>,
  name: string, // eslint-disable-line
};

const mapStateToProps = (state, ownProps: Props) => ({
  form: getFormState(ownProps.pathToStore)(state),
});

const mapDispatchToProps = (dispatch, ownProps: Props) =>
  bindActionCreators(
    {
      formInit: actions.formInit(ownProps.name),
      formChange: actions.formChange(ownProps.name),
      formSubmit: actions.formSubmit(ownProps.name),
    },
    dispatch,
  );

class Form extends React.Component<Props> {
  static defaultProps = {
    validators: {},
    form: {},
    className: undefined,
  };

  componentDidMount() {
    const { formInit } = this.props;
    const childProps = this.getPropsFromChildren();
    formInit(this.createValues(childProps));
  }

  getValidation = (name) => {
    const {
      form: { validation },
    } = this.props;
    return validation[name] ? validation[name] : null;
  };

  getValue = (name) => {
    const {
      form: { values },
    } = this.props;
    return values[name];
  };

  getIsSubmitted = () => this.props.form.submited;

  getPropsFromChildren() {
    const { children } = this.props;
    const {
      props: { children: childrenElements },
    } = children(this.createApi());
    return React.Children.toArray(childrenElements)
      .filter(child => child.props.fieldName)
      .map(child => ({ fieldName: child.props.fieldName, value: child.props.value }));
  }

  withTouched = (acc, key) => {
    const {
      validators,
      form: { values, touched },
    } = this.props;
    const validator = validators[key];
    const value = values[key];
    const touchedKey = touched[key];
    if (validator && touchedKey) {
      return { ...acc, [key]: validator(value) };
    }
    return { ...acc, [key]: null };
  };

  withoutTouched = (acc, key) => {
    const {
      validators,
      form: { values },
    } = this.props;
    const validator = validators[key];
    const value = values[key];
    if (validator) {
      return { ...acc, [key]: validator(value) };
    }
    return { ...acc, [key]: null };
  };

  validateAll(withTouched = true) {
    const { validators } = this.props;
    return R.keys(validators).reduce(withTouched ? this.withTouched : this.withoutTouched, {});
  }

  validate = (name, value) => {
    const {
      validators,
      form: { validation },
    } = this.props;
    const validator = validators[name];
    return validator ? { ...validation, [name]: validator(value) } : validation;
  };

  createValues = childFields =>
    childFields.reduce(
      (acc, childValue) => ({
        ...acc,
        [childValue.fieldName]: this.props.form.values[childValue.fieldName] || childValue.value,
      }),
      {},
    );

  handleChange = name => (value) => {
    const { formChange } = this.props;
    const validation = this.validate(name, value);
    formChange({ name, value, validation });
  };

  submitForm = () => {
    const {
      formSubmit,
      form: { values },
    } = this.props;
    const validation = this.validateAll(false);
    formSubmit(values, validation);
  };

  createApi = () => ({
    handleChange: this.handleChange,
    submitForm: this.submitForm,
    getValidation: this.getValidation,
    getValue: this.getValue,
    getIsSubmitted: this.getIsSubmitted,
  });

  render() {
    const { children, className } = this.props;
    return <div className={classNames(DEFAULT_CLASS_NAME, className)}>{children(this.createApi())}</div>;
  }
}

export const FormPropTypes = PropTypes.shape({
  validation: PropTypes.objectOf(PropTypes.string),
  values: PropTypes.object,
  isValid: PropTypes.bool,
  submited: PropTypes.bool,
  touched: PropTypes.objectOf(PropTypes.bool),
});


export default connect(mapStateToProps, mapDispatchToProps)(Form);
