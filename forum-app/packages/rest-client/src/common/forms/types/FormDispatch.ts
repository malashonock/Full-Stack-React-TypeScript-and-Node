import { FormFields } from '@shared/types';

import { FormAction } from '.';

export type FormDispatch<TFields extends FormFields> = React.Dispatch<
  FormAction<TFields>
>;
