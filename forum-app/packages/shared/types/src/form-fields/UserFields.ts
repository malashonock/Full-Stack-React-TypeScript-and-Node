import { FormFields } from '.';

export interface UserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}
