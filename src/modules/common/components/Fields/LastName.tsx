import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function LastName(props: Props) {
  const { error, isTouched } = props;
  return (
    <div className="col-md-12">
      <label htmlFor="inputName" className="form-label">
        <FormattedMessage id="lastName" />
      </label>

      <div>
        <Field type="text" className="form-control" id="inputName" name="lastName" placeholder="Last Name" />
        {error && isTouched && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
}

export default LastName;
