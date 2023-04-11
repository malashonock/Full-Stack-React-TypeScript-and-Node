import { FieldValidator, FormFields, FormValidationSchema, FormValidationState, FormValidator } from '../shared/validation/types';

const runFieldValidator = <TFields extends FormFields>(
  validator: FieldValidator<TFields[keyof TFields]>, 
  fieldName: keyof TFields & string,
  formValidationState: FormValidationState<TFields>,
): void => {
  const fieldValue = formValidationState.values[fieldName];

  const validationResult = validator(fieldName, fieldValue);

  if (!validationResult.isValid) {
    if (!formValidationState.errors) {
      formValidationState.errors = {}
    }

    if (!formValidationState.errors[fieldName]) {
      formValidationState.errors[fieldName] = [];
    }

    formValidationState.errors[fieldName]?.push(validationResult.errorMessage);
  }
};

const runFieldValidators = <TFields extends FormFields>(
  validationSchema: FormValidationSchema<TFields>,
  formValidationState: FormValidationState<TFields>,
): void => {
  try {
    for (const fieldName in validationSchema) {
      if (Object.prototype.hasOwnProperty.call(validationSchema, fieldName)) {
        if (fieldName === 'form') {
          // For form-level validation, there is a separate function
          continue;
        }
  
        const fieldValidatorOrValidators = validationSchema[fieldName];
  
        if (!fieldValidatorOrValidators) {
          // No validators, proceed to next field
          continue;
        }
  
        if (!Array.isArray(fieldValidatorOrValidators)) {
          // Run the single validator
          const fieldValidator = fieldValidatorOrValidators as FieldValidator<TFields[keyof TFields]>;
          runFieldValidator(fieldValidator, fieldName, formValidationState);
          continue;
        }
  
        // Run the array of validators
        const fieldValidators = fieldValidatorOrValidators as FieldValidator<TFields[keyof TFields]>[];
  
        if (fieldValidators.length === 0) {
          // Array is empty, proceed to next field
          continue;
        }
  
        for (const fieldValidator of fieldValidators) {
          runFieldValidator(fieldValidator, fieldName, formValidationState);
        }
      }
    }
  } catch (error) {
    return;
  }
};

const runFormValidator = <TFields extends FormFields>(
  validator: FormValidator<TFields>, 
  formValidationState: FormValidationState<TFields>,
): void => {
  const validationResult = validator(formValidationState.values);

  if (!validationResult.isValid) {
    if (!formValidationState.errors) {
      formValidationState.errors = {}
    }

    if (!formValidationState.errors.form) {
      formValidationState.errors.form = [];
    }

    formValidationState.errors.form?.push(validationResult.errorMessage);
  }
};

const runFormValidators = <TFields extends FormFields>(
  validationSchema: FormValidationSchema<TFields>,
  formValidationState: FormValidationState<TFields>,
): void => {
  try {
    const formValidatorOrValidators = validationSchema.form;
  
    if (!formValidatorOrValidators) {
      // No validators, return
      return;
    }
  
    if (!Array.isArray(formValidatorOrValidators)) {
      // Run the single validator
      const formValidator = formValidatorOrValidators as FormValidator<TFields>;
      runFormValidator(formValidator, formValidationState);
    }
  
    // Run the array of validators
    const formValidators = formValidatorOrValidators as FormValidator<TFields>[];
  
    if (formValidators.length === 0) {
      // Array is empty, return
      return;
    }
  
    for (const formValidator of formValidators) {
      runFormValidator(formValidator, formValidationState);
    }
  } catch (error) {
    return;
  }
};

const runValidators = <TFields extends FormFields>(
  fieldValues: TFields,
  validationSchema: FormValidationSchema<TFields>
): FormValidationState<TFields> => {
  const formValidationState: FormValidationState<TFields> = {
    values: fieldValues,
  };

  runFieldValidators(validationSchema, formValidationState);
  runFormValidators(validationSchema, formValidationState);

  return formValidationState;
}

export default {
  runValidators,
};