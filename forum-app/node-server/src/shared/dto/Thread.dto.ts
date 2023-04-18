import { Id } from '../../types/Id';
import { FormFields } from '../validation/types';

export interface ThreadFields extends FormFields {
  categoryId: string;
  title: string;
  body: string;
}

export type ThreadDto = Id & ThreadFields;