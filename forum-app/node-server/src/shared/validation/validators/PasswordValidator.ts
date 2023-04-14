import { FieldValidator, FormValidator, ValidationResult, FormFields } from '../types';

export enum CharacterClass {
  UpperCaseLetters,
  LowerCaseLetters,
  Digits,
  SpecialCharacters,
}

export const containsCharClass = (charClass: CharacterClass): FieldValidator<string> => {
  return (fieldLabel: string, password: string): ValidationResult<string> => {
    let pattern: RegExp;
    let errorMessage: string;

    switch (charClass) {
      case CharacterClass.UpperCaseLetters:
        pattern = /[A-Z]+/;
        errorMessage = 'Password must contain at least 1 uppercase letter';
        break;

      case CharacterClass.LowerCaseLetters:
        pattern = /[a-z]+/;
        errorMessage = 'Password must contain at least 1 lowercase letter';
        break;

      case CharacterClass.Digits:
        pattern = /[0-9]+/;
        errorMessage = 'Password must contain at least 1 numerical digit';
        break;

      case CharacterClass.SpecialCharacters:
        pattern = /[`~!@#$%^&*()_=+[{\]}\\|;:'",./?№-]+/;
        errorMessage = 'Password must contain at least 1 special character';
        break;
    }

    return pattern?.test(password)
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage,
      };
  };
};

export const doPasswordsMatch = <TFields extends FormFields>(
  pwdFieldName1: keyof TFields,
  pwdFieldName2: keyof TFields,
): FormValidator<TFields> => {
  return (values: TFields): ValidationResult<TFields> => {
    const match = values[pwdFieldName1] == values[pwdFieldName2];

    return match
      ? {
          isValid: true,
          value: values,
        }
      : {
          isValid: false,
          errorMessage: 'Both passwords should match',
        };
  };
};
