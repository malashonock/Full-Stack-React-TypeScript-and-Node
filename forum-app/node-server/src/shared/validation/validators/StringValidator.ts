import { FieldValidator } from '../types';

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
