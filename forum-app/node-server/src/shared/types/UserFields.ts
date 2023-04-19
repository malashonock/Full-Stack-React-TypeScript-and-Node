import { FormFields } from '../validation/types';

export interface UserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}