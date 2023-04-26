import { FormState } from 'common/forms';
import {
  containsDigits,
  containsLowercaseLetters,
  containsSpecialChars,
  containsUppercaseLetters,
  doPasswordsMatch,
  isLongEnough,
  isRequired,
  isValidEmail,
} from 'common/validation/validators';

export type RegistrationFormFields = {
  userName: string;
  password: string;
  passwordConfirm: string;
  email: string;
};

export type RegistrationFormState = FormState<RegistrationFormFields>;

export const initialValues: RegistrationFormFields = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const validationSchema: RegistrationFormState['validationSchema'] = {
  userName: [isRequired],
  email: [isRequired, isValidEmail],
  password: [
    isRequired,
    isLongEnough,
    containsUppercaseLetters,
    containsLowercaseLetters,
    containsDigits,
    containsSpecialChars,
  ],
  form: [doPasswordsMatch('password', 'passwordConfirm')],
};

export const onSubmit = (values: RegistrationFormFields) => {
  // TODO: dispatch async thunk action
  alert(JSON.stringify(values));
};
