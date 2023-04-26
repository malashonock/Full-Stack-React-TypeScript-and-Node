import { ValidationResult } from '.';
import { FormFields, FormState } from 'common/forms';

export type FormValidator<TFields extends FormFields> = (
  formState: FormState<TFields>,
) => ValidationResult<FormState<TFields>>;
