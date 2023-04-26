import { useReducer } from 'react';

import {
  ControlledFormProps,
  ControlledInputProps,
  FormActionType,
  FormContext,
  FormDispatch,
  FormFields,
  FormState,
} from '../types';
import { formReducer } from '../reducers';

interface UseFormParams<TFields extends FormFields> {
  initialValues: TFields;
  validationSchema?: FormState<TFields>['validationSchema'];
  onSubmit: (values: TFields) => void;
}

interface UseFormResult<TFields extends FormFields> {
  state: FormState<TFields>;
  dispatch: FormDispatch<TFields>;
  registerField: (name: keyof TFields) => ControlledInputProps<TFields>;
  registerForm: () => ControlledFormProps<TFields>;
  canSubmit: boolean;
  resetForm: () => void;
}

export const useForm = <TFields extends FormFields>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormParams<TFields>): UseFormResult<TFields> => {
  const initialState: FormState<TFields> = {
    values: initialValues,
    validationSchema,
    errors: {},
    touched: {},
    dirty: {},
  };

  const [state, dispatch] = useReducer(
    formReducer,
    null,
    () => initialState as any,
  ) as FormContext<TFields>;
  const { values, errors, dirty } = state;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(values);
    resetForm();
  };

  const registerForm = (): ControlledFormProps<TFields> => {
    return {
      state,
      dispatch,
      onSubmit: handleSubmit,
    };
  };

  const canSubmit = !!dirty.form && Object.entries(errors).length === 0;

  const resetForm = () =>
    dispatch({
      type: FormActionType.Reset,
    });

  return {
    state,
    dispatch,
    registerField,
    registerForm,
    canSubmit,
    resetForm,
  };
};
