import { ValidationResult } from '.';

export type FieldValidator<TValue> = (
  fieldLabel: string,
  fieldValue: TValue,
) => ValidationResult<TValue>;
