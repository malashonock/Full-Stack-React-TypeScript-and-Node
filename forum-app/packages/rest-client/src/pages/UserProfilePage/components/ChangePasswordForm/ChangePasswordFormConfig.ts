import { FormState } from 'common/forms';
import {
  containsDigits,
  containsLowercaseLetters,
  containsSpecialChars,
  containsUppercaseLetters,
  doPasswordsMatch,
  isLongEnough,
  isRequired,
} from 'common/validation/validators';

export type ChangePasswordFormFields = {
  password: string;
  passwordConfirm: string;
};

export type ChangePasswordFormState = FormState<ChangePasswordFormFields>;

export const initialValues: ChangePasswordFormFields = {
  password: '********',
  passwordConfirm: '********',
};

export const validationSchema: ChangePasswordFormState['validationSchema'] = {
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

export const onSubmit = (values: ChangePasswordFormFields) => {
  // TODO: dispatch async thunk action
  alert(JSON.stringify(values));
};
