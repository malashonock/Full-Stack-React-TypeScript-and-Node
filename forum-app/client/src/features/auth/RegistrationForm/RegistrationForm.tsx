import { Field, Form, useForm } from 'common/forms';
import {
  initialValues,
  onSubmit,
  validationSchema,
} from './RegistrationFormConfig';

export const RegistrationForm = () => {
  const {
    state: { errors },
    registerField,
    registerForm,
    canSubmit,
  } = useForm({
    initialValues,
    validationSchema,
    onSubmit,
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
            disabled={!canSubmit}
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
