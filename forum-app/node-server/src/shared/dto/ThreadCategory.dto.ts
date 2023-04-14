import { Id } from '../../types/Id';
import { FormFields } from '../validation/types';

export interface ThreadCategoryFields extends FormFields {
  name: string;
  description: string;
}

export type ThreadCategoryDto = Id & ThreadCategoryFields;