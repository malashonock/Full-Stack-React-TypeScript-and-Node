import { ValidationResult } from '.';
import { FormFields } from '.';

export type FormValidator<TFields extends FormFields> = (
  values: TFields,
) => ValidationResult<TFields>;
