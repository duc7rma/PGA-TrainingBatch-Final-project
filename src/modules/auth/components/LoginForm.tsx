import React from 'react';
import { ILoginParams } from 'models/auth';
import { LoginSchema } from 'modules/auth/utils';
import './LoginForm.css';
import { Form, Formik } from 'formik';
import EmailField from './EmailField';
import Spinner from 'react-bootstrap/Spinner';
import PasswordField from './PasswordField';
import ButtonLogin from 'modules/common/components/Buttons/ButtonLogin/ButtonLogin';
// import Loading from 'modules/common/components/Loading';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  onLogin(values: ILoginParams): void;
}

function LoginForm(props: Props) {
  const { onLogin, isLoading, errorMessage } = props;

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onLogin(values);
      }}
      validationSchema={LoginSchema}
    >
      {({ touched, errors }) => {
        return (
          <Form className="form-login">
            <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>Login</h2>

            {!!errorMessage && (
              <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                {errorMessage}
              </div>
            )}

            {isLoading && (
              <div className="loading">
                <Spinner animation="border" role="status" style={{ width: '6rem', height: '6rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            <EmailField error={errors.email} isTouched={touched.email} />
            <PasswordField error={errors.password} isTouched={touched.password} />
            <ButtonLogin isLoading={isLoading} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
