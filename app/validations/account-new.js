import {validateLength, validateFormat} from 'ember-changeset-validations/validators';

export default {
  password: [
    validateLength({min: 8}),
    validateFormat({
      regex: /\w[a-z]/,
      message: '{description} must contain lower case letters (a-z)',
    }),
    validateFormat({
      regex: /\w[A-Z]/,
      message: '{description} must contain upper case letters (A-Z)',
    }),
    validateFormat({
      regex: /\w[0-9]/,
      message: '{description} must contain numbers (0-9)',
    }),
  ],
};
