import { FormFields } from '.';

export interface UserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}

export type LoginFields = Pick<UserFields, 'userName' | 'password'>;
