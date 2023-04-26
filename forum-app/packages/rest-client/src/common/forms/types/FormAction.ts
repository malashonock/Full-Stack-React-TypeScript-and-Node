import { FormActionType, FormFields } from '.';

export type FormAction<TFields extends FormFields> =
  | {
      [FieldName in keyof TFields]: {
        type: FormActionType.ValueChange;
        field: FieldName & string;
        value: TFields[FieldName & string];
      };
    }[keyof TFields]
  | {
      type: FormActionType.Validation;
      field: keyof TFields | 'form';
      message: string;
    }
  | {
      type: FormActionType.Focus | FormActionType.Blur;
      field: keyof TFields;
    }
  | {
      type: FormActionType.Reset;
    };
