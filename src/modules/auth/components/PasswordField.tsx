import React from 'react';
import { Field } from 'formik';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function PasswordField(props: Props) {
  const { error, isTouched } = props;

  return (
    <div className="col-md-12">
      <Field type="password" className="form-control" id="inputPassword" name="password" placeholder="Password" />
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default PasswordField;
