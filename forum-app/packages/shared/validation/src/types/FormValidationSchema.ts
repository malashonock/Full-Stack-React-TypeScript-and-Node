import { FormFields } from '@shared/types';

import { FieldValidator, FormValidator } from '.';

export type FormValidationSchema<TFields extends FormFields> = {
  form?: FormValidator<TFields> | FormValidator<TFields>[];
} & {
  [FieldName in keyof TFields & string]?:
    | FieldValidator<TFields[FieldName]>
    | FieldValidator<TFields[FieldName]>[];
};
