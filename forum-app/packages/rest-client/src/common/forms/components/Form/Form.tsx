import { PropsWithChildren, useEffect } from 'react';
import cn from 'classnames';

import { FormFields } from '@shared/types';

import {
  ControlledFormProps,
  FormActionType,
  FormState,
} from 'common/forms/types';
import { ValidationResult } from 'common/validation/types';

import './Form.scss';

type FormProps<TFields extends FormFields> = ControlledFormProps<TFields> & {
  classNames?: string;
};

export const Form = <TFields extends FormFields>({
  state,
  dispatch,
  onSubmit,
  classNames,
  children,
}: PropsWithChildren<FormProps<TFields>>) => {
  const validators = state.validationSchema?.form;

  const runFormLevelValidators = (): void => {
    const hasValidators = !!validators && validators.length > 0;

    if (hasValidators) {
      let validationResult: ValidationResult<FormState<TFields>> = {
        isValid: true,
        value: state,
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
  }, [state.values]);

  return (
    <form
      className={cn('form', classNames)}
      onSubmit={onSubmit}
      autoComplete="off"
    >
      {children}
    </form>
  );
};
