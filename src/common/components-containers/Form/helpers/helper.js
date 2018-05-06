import * as R from 'ramda';

const isValidated = validation => R.values(validation).every(val => val === null);

export default isValidated;
