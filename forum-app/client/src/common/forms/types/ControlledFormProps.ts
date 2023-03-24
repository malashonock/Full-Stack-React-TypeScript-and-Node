import { FormFields, FormDispatch, FormState } from '.';

export type ControlledFormProps<TFields extends FormFields> = {
  state: FormState<TFields>;
  dispatch: FormDispatch<TFields>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
