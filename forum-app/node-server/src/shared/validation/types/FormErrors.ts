import { FormFields } from '.';

export type FormErrors<TFields extends FormFields> = {
  [FieldName in (keyof TFields & string) | 'form']?: string[];
};