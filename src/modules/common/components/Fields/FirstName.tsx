import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function FirstName(props: Props) {
  const { error, isTouched } = props;
  return (
    <div className="col-md-12">
      <label htmlFor="inputName" className="form-label">
        <FormattedMessage id="firstName" />
      </label>

      <div>
        <Field type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name" />
        {error && isTouched && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
}

export default FirstName;
