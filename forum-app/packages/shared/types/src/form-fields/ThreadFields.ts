import { FormFields } from '.';

export interface ThreadFields extends FormFields {
  categoryId: string;
  title: string;
  body: string;
}
