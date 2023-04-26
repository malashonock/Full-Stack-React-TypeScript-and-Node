export type ValidationResult<TValue> =
  | {
      isValid: true;
      value: TValue;
    }
  | {
      isValid: false;
      errorMessage: string;
    };
