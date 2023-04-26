import { FormFields } from '@shared/types';

import { FormDispatch, FormState } from '.';

export type ControlledFormProps<TFields extends FormFields> = {
  state: FormState<TFields>;
  dispatch: FormDispatch<TFields>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};
