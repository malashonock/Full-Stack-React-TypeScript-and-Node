import {
  CharacterClass,
  containsCharClass,
  doPasswordsMatch,
  isNotShorterThan,
  isRequired,
  isValidEmail,
} from '@shared/validation';

import { FormState } from 'common/forms';

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
    isNotShorterThan(8),
    containsCharClass(CharacterClass.UpperCaseLetters),
    containsCharClass(CharacterClass.LowerCaseLetters),
    containsCharClass(CharacterClass.Digits),
    containsCharClass(CharacterClass.SpecialCharacters),
  ],
  form: [doPasswordsMatch('password', 'passwordConfirm')],
};

export const onSubmit = (values: RegistrationFormFields) => {
  // TODO: dispatch async thunk action
  alert(JSON.stringify(values));
};
