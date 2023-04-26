import { Field, Form, useForm } from 'common/forms';
import {
  initialValues,
  onSubmit,
  validationSchema,
} from './RegistrationFormConfig';
import { Modal, ModalProps } from 'common/components/Modal';

import './RegistrationForm.scss';

export const RegistrationForm = ({ isOpen, onClose }: ModalProps) => {
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
      <Form {...registerForm()} classNames="registration-form">
        <main className="registration-form__inputs">
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
        </main>
        <footer className="registration-form__footer">
          <div className="registration-form__buttons">
            <button
              type="submit"
              disabled={!canSubmit}
              className="registration-form__button registration-form__button--submit"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="registration-form__button registration-form__button--close"
            >
              Close
            </button>
          </div>
          {errors.form ? (
            <div className="registration-form__helper-text">{errors.form}</div>
          ) : null}
        </footer>
      </Form>
    </Modal>
  );
};
