import { AuthDto } from '@shared/types';

import { Field, Form, useForm } from 'common/forms';
import {
  LoginFormFields,
  initialValues,
  validationSchema,
} from './LoginFormConfig';
import { Modal, ModalProps } from 'common/components/Modal';
import { useAppDispatch } from 'hooks';
import { logIn } from 'store/slices/auth.slice';
import { AuthService } from 'services';

import './LoginForm.scss';

export const LoginForm = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useAppDispatch();

  const onSubmit = async ({
    name,
    password,
  }: LoginFormFields): Promise<void> => {
    try {
      const authData: AuthDto = await AuthService.login(name, password);
      dispatch(logIn(authData));
      onClose();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form {...registerForm()} classNames="login-form">
        <main className="login-form__inputs">
          <Field
            type="text"
            label="User name"
            name="name"
            {...registerField('name')}
          />
          <Field
            type="password"
            label="Password"
            name="password"
            {...registerField('password')}
          />
        </main>
        <footer className="login-form__footer">
          <div className="login-form__buttons">
            <button
              type="submit"
              disabled={!canSubmit}
              className="login-form__button login-form__button--submit"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="login-form__button login-form__button--close"
            >
              Close
            </button>
          </div>
          {errors.form ? (
            <div className="login-form__helper-text">{errors.form}</div>
          ) : null}
        </footer>
      </Form>
    </Modal>
  );
};
