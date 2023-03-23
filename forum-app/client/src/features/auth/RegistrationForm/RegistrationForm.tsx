import { Field, Form, FormState, useForm } from 'common/forms';
import {
  containsDigits,
  containsLowercaseLetters,
  containsSpecialChars,
  containsUppercaseLetters,
  doPasswordsMatch,
  isLongEnough,
  isRequired,
  isValidEmail,
} from 'common/validation/validators';

type RegistrationFormFields = {
  userName: string;
  password: string;
  passwordConfirm: string;
  email: string;
};

type RegistrationFormState = FormState<RegistrationFormFields>;

const initialValues: RegistrationFormFields = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema: RegistrationFormState['validationSchema'] = {
  userName: [isRequired],
  email: [isRequired, isValidEmail],
  password: [
    isRequired,
    isLongEnough,
    containsUppercaseLetters,
    containsLowercaseLetters,
    containsDigits,
    containsSpecialChars,
  ],
  form: [doPasswordsMatch('password', 'passwordConfirm')],
};

export const RegistrationForm = () => {
  const {
    state: { values, errors },
    dispatch,
    registerField,
    registerForm,
  } = useForm({
    initialValues,
    validationSchema,
  });

  return (
    <Form {...registerForm()}>
      <Field
        type="text"
        label="User name"
        name="userName"
        {...registerField('userName')}
      />
      <Field
        type="email"
        label="Email"
        name="email"
        {...registerField('email')}
      />
      <Field
        type="password"
        label="Password"
        name="password"
        {...registerField('password')}
      />
      <Field
        type="password"
        label="Confirm password"
        name="passwordConfirm"
        {...registerField('passwordConfirm')}
      />
      <footer className="form__footer">
        <div className="form__buttons">
          <button
            type="submit"
            className="form__button form__button--registerField"
          >
            Register
          </button>
          <button type="button" className="form__button form__button--close">
            Close
          </button>
        </div>
        {errors.form ? (
          <div className="form__helper-text">{errors.form}</div>
        ) : null}
      </footer>
    </Form>
  );
};
