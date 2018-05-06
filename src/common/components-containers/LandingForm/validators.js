const validatePassword = (value, errorMessage = 'Password must have characters more or equal than 4') => {
  if (!value) {
    return errorMessage;
  }
  if (value.length < 4) {
    return errorMessage;
  }
  return null;
};

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; // eslint-disable-line

const validateEmail = (value, errorMessage = 'Please type correct email') => {
  if (!value) {
    return errorMessage;
  }
  if (!emailRegex.test(value)) {
    return errorMessage;
  }
  return null;
};

const validateAgreement = (value, errorMessage = 'Should accept this agreement') => {
  if (!value) {
    return errorMessage;
  }
  return null;
};

const validators = {
  password: validatePassword,
  agreement: validateAgreement,
  email: validateEmail,
};

export default validators;
