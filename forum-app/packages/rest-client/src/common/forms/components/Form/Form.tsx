import { PropsWithChildren, useEffect } from 'react';
import cn from 'classnames';

import { FormFields } from '@shared/types';
import {
  ValidationService,
  ValidationResult,
  FormValidationState,
  FormValidationSchema,
} from '@shared/validation';

import {
  ControlledFormProps,
  FormActionType,
  FormState,
} from 'common/forms/types';

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
      const validationState = {
        values: state.values,
      } as FormValidationState<TFields>;

      const validationSchema = {
        form: validators,
      } as FormValidationSchema<TFields>;

      ValidationService.runFormValidators(validationSchema, validationState);

      const errors: string = validationState.errors
        ? validationState.errors.form?.join('\n') || ''
        : '';

      dispatch({
        type: FormActionType.Validation,
        field: 'form',
        message: errors,
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
