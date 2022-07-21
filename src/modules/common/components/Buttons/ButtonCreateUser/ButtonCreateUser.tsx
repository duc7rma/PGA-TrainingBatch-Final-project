import React from 'react';
import { FormattedMessage } from 'react-intl';
import './ButtonRegister.css';

interface Props {
  isLoading: boolean;
}

function ButtonRegister(props: Props) {
  const { isLoading } = props;
  return (
    <div className="box-create-user" style={{ margin: '16px 0' }}>
      <div className="wrapper">
        <div className="col-md-auto">
          <button className="btn-create-user" type="submit" disabled={isLoading}>
            {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <span>
              <FormattedMessage id="createUser" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonRegister;
