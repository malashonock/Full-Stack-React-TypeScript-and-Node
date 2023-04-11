import { FieldValidator, FormValidator, ValidationResult, FormFields } from '../types';

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
