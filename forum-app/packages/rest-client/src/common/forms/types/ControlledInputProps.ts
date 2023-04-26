import { FormFields } from '@shared/types';
import { FieldValidator } from '@shared/validation';

import { FormDispatch } from '.';

export type ControlledInputProps<TFields extends FormFields> = {
  [FieldName in keyof TFields]: {
    value: TFields[FieldName & string];
    error?: string;
    validators?: Array<FieldValidator<TFields[FieldName & string]>>;
    dispatch: FormDispatch<TFields>;
  };
}[keyof TFields];
