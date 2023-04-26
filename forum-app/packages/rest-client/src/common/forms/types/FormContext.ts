import { FormFields } from '@shared/types';

import { FormState, FormDispatch } from '.';

export type FormContext<TFields extends FormFields> = [
  context: FormState<TFields>,
  dispatch: FormDispatch<TFields>,
];
