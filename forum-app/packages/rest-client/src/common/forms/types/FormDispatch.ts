import { FormFields, FormAction } from '.';

export type FormDispatch<TFields extends FormFields> = React.Dispatch<
  FormAction<TFields>
>;
