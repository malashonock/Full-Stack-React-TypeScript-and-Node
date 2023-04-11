import { FieldValidator, FormFields, FormValidator } from '.';

export type FormValidationSchema<TFields extends FormFields> = {
  form?: 
    | FormValidator<TFields>
    | FormValidator<TFields>[];
} & {
  [FieldName in keyof TFields & string]?: 
    | FieldValidator<TFields[FieldName]>
    | FieldValidator<TFields[FieldName]>[];
};