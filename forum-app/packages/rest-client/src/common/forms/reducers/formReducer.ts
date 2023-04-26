/* eslint-disable no-case-declarations */
import { FormAction, FormActionType, FormFields, FormState } from '../types';

let initialState: unknown = undefined;

const deriveDirtyState = <TFields extends FormFields>(
  values: TFields,
): FormState<TFields>['dirty'] => {
  const { values: initialValues } = initialState as FormState<TFields>;
  const dirtyState: FormState<TFields>['dirty'] = {};

  for (const field in initialValues) {
    if (Object.prototype.hasOwnProperty.call(initialValues, field)) {
      const initialValue = initialValues[field];
      const currentValue = values[field];
      const isFieldDirty = currentValue !== initialValue;
      if (isFieldDirty) {
        dirtyState[field] = true;
      } else {
        delete dirtyState[field];
      }
    }
  }

  if (Object.entries(dirtyState).length > 0) {
    (dirtyState as { form?: boolean }).form = true;
  }

  return dirtyState;
};

export const formReducer = <TFields extends FormFields>(
  state: FormState<TFields>,
  action: FormAction<TFields>,
): FormState<TFields> => {
  // Cache initial values on 1st run to enable dirty state monitoring
  if (!initialState) {
    initialState = state;
  }

  switch (action.type) {
    case FormActionType.ValueChange:
      const valueChanged = state.values[action.field] !== action.value;

      if (valueChanged) {
        const changedValues: TFields = {
          ...state.values,
          [action.field]: action.value,
        };

        return {
          ...state,
          values: changedValues,
          dirty: deriveDirtyState(changedValues),
        };
      } else {
        return state;
      }
    case FormActionType.Validation:
      const validationChanged =
        state.errors[action.field] !== action.message &&
        !!(state.errors[action.field] || action.message);

      if (validationChanged) {
        const changedErrors = Object.fromEntries(
          Object.entries({
            ...state.errors,
            [action.field]: action.message,
          }).filter(([_, value]) => !!value),
        ) as FormState<TFields>['errors'];

        return {
          ...state,
          errors: changedErrors,
        };
      } else {
        return state;
      }
    case FormActionType.Focus:
      const touchedChanged = !state.touched[action.field];
      return touchedChanged
        ? {
            ...state,
            touched: {
              ...state.touched,
              [action.field]: true,
              form: true,
            },
          }
        : state;
    case FormActionType.Reset:
      return {
        ...(initialState as FormState<TFields>),
      };
    default:
      return state;
  }
};
