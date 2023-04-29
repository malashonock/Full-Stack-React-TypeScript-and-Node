import { FormFields } from '.';

export interface UserFields extends FormFields {
  name: string;
  email: string;
  password: string;
}

export type LoginFields = Pick<UserFields, 'name' | 'password'>;
