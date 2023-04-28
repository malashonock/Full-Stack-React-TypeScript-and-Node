import { NewUserFields } from '@shared/types';
import {
  CharacterClass,
  containsCharClass,
  doPasswordsMatch,
  isNotShorterThan,
  isRequired,
} from '@shared/validation';

import { FormState } from 'common/forms';

export type ChangePasswordFormFields = Pick<NewUserFields, 'password'> & {
  passwordConfirm: string;
};

export type ChangePasswordFormState = FormState<ChangePasswordFormFields>;

export const initialValues: ChangePasswordFormFields = {
  password: '********',
  passwordConfirm: '********',
};

export const validationSchema = {
  password: [
    isRequired,
    isNotShorterThan(8),
    containsCharClass(CharacterClass.UpperCaseLetters),
    containsCharClass(CharacterClass.LowerCaseLetters),
    containsCharClass(CharacterClass.Digits),
    containsCharClass(CharacterClass.SpecialCharacters),
  ],
  form: [doPasswordsMatch('password', 'passwordConfirm')],
} as ChangePasswordFormState['validationSchema'];
