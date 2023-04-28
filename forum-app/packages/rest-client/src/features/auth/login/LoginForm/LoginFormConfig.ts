import { LoginFields } from '@shared/types';
import { isRequired } from '@shared/validation';

import { FormState } from 'common/forms';

export type LoginFormFields = LoginFields;

export type LoginFormState = FormState<LoginFormFields>;

export const initialValues: LoginFormFields = {
  userName: '',
  password: '',
};

export const validationSchema: LoginFormState['validationSchema'] = {
  userName: [isRequired],
  password: [isRequired],
};
