import { FormFields } from '@shared/types';

import { FormDispatch } from '.';
import { FieldValidator } from 'common/validation/types';

export type ControlledInputProps<TFields extends FormFields> = {
  [FieldName in keyof TFields]: {
    value: TFields[FieldName & string];
    error?: string;
    validators?: Array<FieldValidator<TFields[FieldName & string]>>;
    dispatch: FormDispatch<TFields>;
  };
}[keyof TFields];
