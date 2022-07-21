import React from 'react';
import { Field } from 'formik';
import './inputFeedback.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function EmailField(props: Props) {
  const { error, isTouched } = props;

  return (
    <div className="col-md-12">
      <label htmlFor="inputName" className="form-label">
        <FormattedMessage id="email" />
      </label>

      <div>
        <Field type="email" className="form-control" name="email" id="inputEmail" placeholder="Email" />
        {error && isTouched && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
}

export default EmailField;
