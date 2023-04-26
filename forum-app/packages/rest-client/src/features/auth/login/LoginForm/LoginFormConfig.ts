import { isRequired } from '@shared/validation';

import { FormState } from 'common/forms';

export type LoginFormFields = {
  userName: string;
  password: string;
};

export type LoginFormState = FormState<LoginFormFields>;

export const initialValues: LoginFormFields = {
  userName: '',
  password: '',
};

export const validationSchema: LoginFormState['validationSchema'] = {
  userName: [isRequired],
  password: [isRequired],
};

export const onSubmit = (values: LoginFormFields) => {
  // TODO: dispatch async thunk action
  alert(JSON.stringify(values));
};
