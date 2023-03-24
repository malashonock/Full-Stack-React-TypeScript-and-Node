import { FormFields, FormDispatch } from '.';
import { FormValidator } from 'common/validation/types';

export type ControlledFormProps<TFields extends FormFields> = {
  values: TFields;
  validators?: Array<FormValidator<TFields>>;
  dispatch: FormDispatch<TFields>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
