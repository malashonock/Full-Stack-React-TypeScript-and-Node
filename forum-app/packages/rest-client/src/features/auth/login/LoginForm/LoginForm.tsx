import { Field, Form, useForm } from 'common/forms';
import { initialValues, onSubmit, validationSchema } from './LoginFormConfig';

import './LoginForm.scss';
import { Modal, ModalProps } from 'common/components/Modal';

export const LoginForm = ({ isOpen, onClose }: ModalProps) => {
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
            name="userName"
            {...registerField('userName')}
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
