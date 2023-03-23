/* eslint-disable no-case-declarations */
import { FormAction, FormActionType, FormFields, FormState } from '../types';

export const formReducer = <TFields extends FormFields>(
  state: FormState<TFields>,
  action: FormAction<TFields>,
): FormState<TFields> => {
  switch (action.type) {
    case FormActionType.ValueChange:
      const valueChanged = state.values[action.field] !== action.value;
      return valueChanged
        ? {
            ...state,
            values: {
              ...state.values,
              [action.field]: action.value,
            },
          }
        : state;
    case FormActionType.Validation:
      const validationChanged =
        state.errors[action.field] !== action.message &&
        !!(state.errors[action.field] || action.message);
      return validationChanged
        ? {
            ...state,
            errors: {
              ...state.errors,
              [action.field]: action.message,
            },
          }
        : state;
  }
};
