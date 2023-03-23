import { useReducer } from 'react';

import {
  ControlledFormProps,
  ControlledInputProps,
  FormContext,
  FormDispatch,
  FormFields,
  FormState,
} from '../types';
import { formReducer } from '../reducers';

interface UseFormParams<TFields extends FormFields> {
  initialValues: TFields;
  validationSchema?: FormState<TFields>['validationSchema'];
}

interface UseFormResult<TFields extends FormFields> {
  state: FormState<TFields>;
  dispatch: FormDispatch<TFields>;
  registerField: (name: keyof TFields) => ControlledInputProps<TFields>;
  registerForm: () => ControlledFormProps<TFields>;
}

export const useForm = <TFields extends FormFields>({
  initialValues,
  validationSchema,
}: UseFormParams<TFields>): UseFormResult<TFields> => {
  const initialState: FormState<TFields> = {
    values: initialValues,
    validationSchema,
    errors: {},
  };

  const [state, dispatch] = useReducer(
    formReducer,
    initialState as any,
  ) as FormContext<TFields>;
  const { values, errors } = state;

  const registerField = (
    name: keyof TFields,
  ): ControlledInputProps<TFields> => {
    return {
      value: values[name],
      error: errors[name],
      validators: validationSchema ? validationSchema[name] : undefined,
      dispatch,
    } as ControlledInputProps<TFields>;
  };

  const registerForm = (): ControlledFormProps<TFields> => {
    return {
      values,
      validators: validationSchema ? validationSchema.form : undefined,
      dispatch,
    };
  };

  return {
    state,
    dispatch,
    registerField,
    registerForm,
  };
};
