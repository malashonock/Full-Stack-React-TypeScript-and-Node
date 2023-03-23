import { ValidationResult } from '.';
import { FormFields } from 'common/forms';

export type FormValidator<TFields extends FormFields> = (
  values: TFields,
) => ValidationResult<TFields>;
