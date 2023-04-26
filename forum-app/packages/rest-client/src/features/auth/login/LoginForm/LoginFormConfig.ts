import { FormState } from 'common/forms';
import { isRequired } from 'common/validation/validators';

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
