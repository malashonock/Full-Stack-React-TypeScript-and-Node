import { Id } from '../../types/Id';
import { FormFields } from '../validation/types';

export interface UserFields extends FormFields {
  userName: string;
  email: string;
  password: string;
}

export type UserFullDto = Id & Omit<UserFields, 'password'>;