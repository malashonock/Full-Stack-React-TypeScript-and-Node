import { PropsWithChildren, useEffect } from 'react';

import { ControlledFormProps, FormActionType, FormFields } from '../types';
import { ValidationResult } from 'common/validation/types';

export const Form = <TFields extends FormFields>({
  values,
  validators,
  dispatch,
  children,
}: PropsWithChildren<ControlledFormProps<TFields>>) => {
  const runFormLevelValidators = (): void => {
    const hasValidators = !!validators && validators.length > 0;

    if (hasValidators) {
      let validationResult: ValidationResult<TFields> = {
        isValid: true,
        value: values,
      };

      let i = 0;

      while (i < validators.length && validationResult.isValid) {
        const validator = validators[i++];
        validationResult = validator(validationResult.value);
      }

      dispatch({
        type: FormActionType.Validation,
        field: 'form',
        message: validationResult.isValid ? '' : validationResult.errorMessage,
      });
    }
  };

  useEffect(() => {
    runFormLevelValidators();
  }, [values]);

  return (
    <form className="form" autoComplete="off">
      {children}
    </form>
  );
};
