import { FormFields } from '../validation/types';

export interface NewUserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  userName: string;
  email: string;
}