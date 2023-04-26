import { FormFields } from '@shared/types';

import { ValidationResult } from '.';

export type FormValidator<TFields extends FormFields> = (
  values: TFields,
) => ValidationResult<TFields>;
