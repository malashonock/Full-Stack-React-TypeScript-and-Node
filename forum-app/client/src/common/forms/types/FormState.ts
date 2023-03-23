import { FormFields } from '.';
import { FieldValidator, FormValidator } from 'common/validation/types';

export interface FormState<TFields extends FormFields> {
  values: TFields;
  errors: {
    [FieldName in keyof TFields | 'form']?: string;
  };
  validationSchema?: {
    [FieldName in keyof TFields]?: Array<FieldValidator<TFields[FieldName]>>;
  } & {
    form?: Array<FormValidator<TFields>>;
  };
}
