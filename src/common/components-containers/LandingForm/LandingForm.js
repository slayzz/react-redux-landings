import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validationTooltip from 'common/HOC/tooltip';
import Input from 'common/components/Input/Input';
import CheckBox from 'common/components/CheckBox/CheckBox';
import Header from 'common/components/Header/Header';
import BenefitList from 'common/components/BenefitList/BenefitList';
import RadioButtonsGroup from 'common/components/RadioButtons/RadioButtonsGroup';
import Form from 'common/components-containers/Form/Form';
import { Button } from 'common/components/Button/Button';
import validators from 'common/components-containers/LandingForm/validators';

import './LandingForm.scss';

const DEFAULT_CLASS_FORM_NAME = 'landing-form__container';

const currencyItems = [
  {
    value: '\u20BD',
    id: 'rub',
  },
  {
    value: '\u0024',
    id: 'usd',
  },
  {
    value: '\u20AC',
    id: 'eur',
  },
];

const InputEmailTooltiped = validationTooltip(Input, { position: 'top' })();
const InputPasswordTooltiped = validationTooltip(Input, { position: 'top' })();
const CheckBoxTooltiped = validationTooltip(CheckBox, { position: 'top' })();

class LandingForm extends Component {
  focusEmail = () => {
    this.inputEmail.focus();
  };

  render() {
    const { className } = this.props;
    return (
      <Form className={className} name="47-03-01" validators={validators} pathToStore={['land']}>
        {api => (
          <div className={DEFAULT_CLASS_FORM_NAME}>
            <Header className="landing-form__header" text="Start trading options right now!" />
            <BenefitList
              items={[
                'Get constant yet affordable results with a low minimum trade amount of just $1',
                'Get up to 100% profitability on each trade every minute',
              ]}
            />
            <InputEmailTooltiped
              ref={(el) => {
                this.inputEmail = el;
              }}
              tooltipText={api.getValidation('email')}
              validation={api.getValidation('email')}
              fieldName="email"
              onChange={api.handleChange('email')}
              value={api.getValue('email')}
              placeholder="You e-mail"
            />
            <InputPasswordTooltiped
              type="password"
              tooltipText={api.getValidation('password')}
              validation={api.getValidation('password')}
              fieldName="password"
              onChange={api.handleChange('password')}
              value={api.getValue('password')}
              placeholder="Create password"
            />
            <RadioButtonsGroup
              fieldName="currency"
              label="Currency to deposit and withdraw money"
              onChange={api.handleChange('currency')}
              value={api.getValue('currency') || currencyItems[0]}
              items={currencyItems}
            />
            <CheckBoxTooltiped
              tooltipText={api.getValidation('agreement')}
              fieldName="agreement"
              onChange={api.handleChange('agreement')}
              value={api.getValue('agreement')}
              validation={api.getValidation('agreement')}
            >
              <p>I am of legal age, and I have reviewed and accept the service agreement.</p>
            </CheckBoxTooltiped>
            <Button
              onClick={api.submitForm}
              style={{ width: '100%', height: 56, backgroundColor: '#20a86b', border: 'none' }}
            >
              Register
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

LandingForm.defaultProps = {
  className: undefined,
};

LandingForm.propTypes = {
  className: PropTypes.string,
};

export default LandingForm;
