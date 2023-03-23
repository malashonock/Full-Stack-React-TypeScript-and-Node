import { FormFields } from 'common/forms';
import { FieldValidator, FormValidator, ValidationResult } from '../types';

export const isLongEnough: FieldValidator<string> = (fieldLabel, password) => {
  const PWD_MIN_LENGTH = 8;

  return password.length >= PWD_MIN_LENGTH
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage: 'Password must be no shorter than 8 characters',
      };
};

export const containsUppercaseLetters: FieldValidator<string> = (
  fieldLabel,
  password,
) => {
  const strongPassword = /[A-Z]+/;

  return strongPassword.test(password)
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage: 'Password must contain at least 1 uppercase letter',
      };
};

export const containsLowercaseLetters: FieldValidator<string> = (
  fieldLabel,
  password,
) => {
  const strongPassword = /[a-z]+/;

  return strongPassword.test(password)
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage: 'Password must contain at least 1 lowercase letter',
      };
};

export const containsDigits: FieldValidator<string> = (
  fieldLabel,
  password,
) => {
  const strongPassword = /[0-9]+/;

  return strongPassword.test(password)
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage: 'Password must contain at least 1 digit',
      };
};

export const containsSpecialChars: FieldValidator<string> = (
  fieldLabel,
  password,
) => {
  const strongPassword = /[`~!@#$%^&*()_=+[{\]}\\|;:'",./?№-]+/;

  return strongPassword.test(password)
    ? {
        isValid: true,
        value: password,
      }
    : {
        isValid: false,
        errorMessage: 'Password must contain at least 1 special character',
      };
};

export const doPasswordsMatch = <TFields extends FormFields>(
  pwdFieldName1: keyof TFields,
  pwdFieldName2: keyof TFields,
): FormValidator<TFields> => {
  type PasswordFields = typeof pwdFieldName1 | typeof pwdFieldName2;

  return (values: TFields): ValidationResult<Pick<TFields, PasswordFields>> => {
    const pwd1 = values[pwdFieldName1];
    const pwd2 = values[pwdFieldName2];

    return pwd1 === pwd2
      ? {
          isValid: true,
          value: {
            [pwdFieldName1]: pwd1,
            [pwdFieldName2]: pwd2,
          } as Pick<TFields, PasswordFields>,
        }
      : {
          isValid: false,
          errorMessage: 'Both passwords should match',
        };
  };
};
