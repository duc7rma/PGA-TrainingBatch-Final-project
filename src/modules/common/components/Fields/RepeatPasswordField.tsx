import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import './inputFeedback.css';

interface Props {
  error: string | undefined;
  isTouched: boolean | undefined;
}

function RepeatPasswordField(props: Props) {
  const { error, isTouched } = props;
  return (
    <div className="col-md-12">
      <label htmlFor="inputRepeatPassword" className="form-label">
        <FormattedMessage id="confirm_password" />
      </label>

      <div>
        <Field
          type="password"
          className="form-control"
          id="inputConfirmPassword"
          name="confirm_password"
          placeholder="Repeat Your Password"
        />
        {error && isTouched && <div className="input-error">{error}</div>}
      </div>
    </div>
  );
}

export default RepeatPasswordField;
