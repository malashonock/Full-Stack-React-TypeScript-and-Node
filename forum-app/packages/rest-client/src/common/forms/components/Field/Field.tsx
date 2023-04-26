import cn from 'classnames';

import { FormFields } from '@shared/types';
import {
  ValidationService,
  FormValidationSchema,
  FormValidationState,
} from '@shared/validation';

import { ControlledInputProps, FormAction, FormActionType } from '../../types';

import './Field.scss';

type FormFieldProps<TFields extends FormFields> =
  ControlledInputProps<TFields> &
    {
      [FieldName in keyof TFields]: {
        name: FieldName & string;
        label: string;
        type: TFields[FieldName & string] extends Date | null
          ? 'date' | 'datetime-local'
          : TFields[FieldName & string] extends number | null
          ? 'number'
          : 'text' | 'email' | 'password' | 'tel';
        classNames?: {
          container?: string;
          label?: string;
          input?: string;
          helper?: string;
        };
      };
    }[keyof TFields];

export const Field = <TFields extends FormFields>({
  name,
  label,
  type,
  value,
  error,
  validators,
  dispatch,
  classNames,
}: FormFieldProps<TFields>) => {
  type TValue = TFields[typeof name];

  const parseInputValue = (input: HTMLInputElement): TValue => {
    return ((): FormFields[keyof FormFields] => {
      switch (type) {
        case 'date':
        case 'datetime-local':
          return input.valueAsDate;
        case 'number':
          return input.valueAsNumber ?? null;
        default:
          return input.value;
      }
    })() as TValue;
  };

  const stringifyInputValue = (value: TValue): string => {
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === 'number') {
      return value.toString();
    }

    return value ?? '';
  };

  const validateField = (value: TValue) => {
    const hasValidators = !!validators && validators.length > 0;

    if (hasValidators) {
      const validationState = {
        values: {
          [name]: value,
        },
      } as FormValidationState<TFields>;

      const validationSchema = {
        [name]: validators,
      } as FormValidationSchema<TFields>;

      ValidationService.runFieldValidators(validationSchema, validationState);

      const errors: string = validationState.errors
        ? validationState.errors[name]?.join('\n') || ''
        : '';

      dispatch({
        type: FormActionType.Validation,
        field: name,
        message: errors,
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInputValue(event.target);

    dispatch({
      type: FormActionType.ValueChange,
      field: name,
      value,
    } as FormAction<TFields>);

    validateField(value);
  };

  const handleFocus = (): void => {
    dispatch({
      type: FormActionType.Focus,
      field: name,
    });
  };

  return (
    <div className={cn('form__field', 'field', classNames?.container)}>
      <label htmlFor={name} className={cn('field__label', classNames?.label)}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={cn('field__input', classNames?.input, {
          'field__input--error': error,
        })}
        value={stringifyInputValue(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete="off"
      />
      {error ? (
        <p className={cn('field__helper-text', classNames?.helper)}>{error}</p>
      ) : null}
    </div>
  );
};
