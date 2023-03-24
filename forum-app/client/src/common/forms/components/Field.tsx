import { useForm } from '../hooks';
import {
  ControlledInputProps,
  FormAction,
  FormActionType,
  FormFields,
} from '../types';
import { ValidationResult } from 'common/validation/types';

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
      let validationResult: ValidationResult<TValue> = {
        isValid: true,
        value,
      };

      let i = 0;

      while (i < validators.length && validationResult.isValid) {
        const validator = validators[i++];
        validationResult = validator(label, validationResult.value);
      }

      dispatch({
        type: FormActionType.Validation,
        field: name,
        message: validationResult.isValid ? '' : validationResult.errorMessage,
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
    <div className="form__field field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="field__input"
        value={stringifyInputValue(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete="off"
      />
      {error ? <p className="field__helper-text">{error}</p> : null}
    </div>
  );
};
