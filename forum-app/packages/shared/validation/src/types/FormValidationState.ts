import { FormFields } from '@shared/types';

import { FormErrors } from '.';

export interface FormValidationState<TFields extends FormFields> {
  values: TFields;
  errors?: FormErrors<TFields>;
}
