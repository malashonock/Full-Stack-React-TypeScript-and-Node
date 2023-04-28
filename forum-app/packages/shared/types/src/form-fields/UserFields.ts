import { FormFields } from '.';

export interface NewUserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}

export type UpdateUserFields = Partial<NewUserFields>;

export type LoginFields = Pick<NewUserFields, 'userName' | 'password'>;
