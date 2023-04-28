import { useNavigate } from 'react-router-dom';

import { Field, Form, useForm } from 'common/forms';
import {
  ChangePasswordFormFields,
  initialValues,
  validationSchema,
} from './ChangePasswordFormConfig';
import { UserService } from 'services';
import { useAppSelector } from 'hooks';
import { selectLoggedUser } from 'store/slices/auth.slice';

import './ChangePasswordForm.scss';

export const ChangePasswordForm = () => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const navigate = useNavigate();

  const onSubmit = async ({
    password,
  }: ChangePasswordFormFields): Promise<void> => {
    try {
      if (loggedUser) {
        await UserService.updateUser(loggedUser.id, { password });
        navigate('/');
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

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
    <Form {...registerForm()} classNames="change-password-form">
      <main className="change-password-form__inputs">
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
      </main>
      <footer className="change-password-form__footer">
        <div className="change-password-form__buttons">
          <button
            type="submit"
            disabled={!canSubmit}
            className="change-password-form__button change-password-form__button--submit"
          >
            Change password
          </button>
        </div>
        {errors.form ? (
          <div className="change-password-form__helper-text">{errors.form}</div>
        ) : null}
      </footer>
    </Form>
  );
};
