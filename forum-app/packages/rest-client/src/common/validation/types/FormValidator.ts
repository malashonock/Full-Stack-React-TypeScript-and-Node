import { FormFields } from '@shared/types';

import { ValidationResult } from '.';
import { FormState } from 'common/forms';

export type FormValidator<TFields extends FormFields> = (
  formState: FormState<TFields>,
) => ValidationResult<FormState<TFields>>;
