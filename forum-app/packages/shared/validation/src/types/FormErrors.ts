import { FormFields } from '@shared/types';

export type FormErrors<TFields extends FormFields> = {
  [FieldName in (keyof TFields & string) | 'form']?: string[];
};
