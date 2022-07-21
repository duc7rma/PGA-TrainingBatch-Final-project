import React from 'react';
import { Field } from 'formik';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function EmailField(props: Props) {
  const { error, isTouched } = props;

  return (
    <div className="col-md-12" style={{ marginBottom: '12px' }}>
      <Field type="text" className="form-control" name="email" id="inputEmail" placeholder="Email" />
      {error && isTouched && <div className="input-error">{error}</div>}
    </div>
  );
}

export default EmailField;
