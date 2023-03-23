import { FormState, FormFields, FormDispatch } from '.';

export type FormContext<TFields extends FormFields> = [
  context: FormState<TFields>,
  dispatch: FormDispatch<TFields>,
];
