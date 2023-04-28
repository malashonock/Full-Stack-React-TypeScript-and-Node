import { NewUserFields } from '@shared/types';
import {
  CharacterClass,
  containsCharClass,
  doPasswordsMatch,
  isNotShorterThan,
  isRequired,
  isValidEmail,
} from '@shared/validation';

import { FormState } from 'common/forms';

export type RegistrationFormFields = NewUserFields & {
  passwordConfirm: string;
};

export type RegistrationFormState = FormState<RegistrationFormFields>;

export const initialValues: RegistrationFormFields = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const validationSchema = {
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
} as RegistrationFormState['validationSchema'];
