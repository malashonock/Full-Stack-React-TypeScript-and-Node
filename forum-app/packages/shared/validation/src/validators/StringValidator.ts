import { FieldValidator, ValidationResult } from '../types';

export const isRequired: FieldValidator<string> = (fieldLabel, text) => {
  const isNotEmpty = !!text && text.length > 0;

  return isNotEmpty
    ? {
        isValid: true,
        value: text,
      }
    : {
        isValid: false,
        errorMessage: `${fieldLabel} is required`,
      };
};

export const isNotShorterThan = (minLength: number): FieldValidator<string> => {
  return (fieldLabel: string, text: string): ValidationResult<string> => {
    const isLongEnough = text?.length >= minLength;

    return isLongEnough
      ? {
          isValid: true,
          value: text,
        }
      : {
          isValid: false,
          errorMessage: `${fieldLabel} must contain at least ${minLength} characters`,
        };
  };
};

export const isNotLongerThan = (maxLength: number): FieldValidator<string> => {
  return (fieldLabel: string, text: string): ValidationResult<string> => {
    const isShortEnough = text?.length <= maxLength;

    return isShortEnough
      ? {
          isValid: true,
          value: text,
        }
      : {
          isValid: false,
          errorMessage: `${fieldLabel} must contain at most ${maxLength} characters`,
        };
  };
};
