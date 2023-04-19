import { FormFields } from '../validation/types';

export interface ThreadFields extends FormFields {
  categoryId: string;
  title: string;
  body: string;
}