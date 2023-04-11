import { FormErrors, FormFields } from '.';

export interface FormValidationState<TFields extends FormFields> {
  values: TFields;
  errors?: FormErrors<TFields>;
}
