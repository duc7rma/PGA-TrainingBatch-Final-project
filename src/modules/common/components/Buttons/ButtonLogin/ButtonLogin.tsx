import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ButtonLogin.css';

interface Props {
  isLoading: boolean;
}

function ButtonLogin(props: Props) {
  const { isLoading } = props;
  return (
    <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
      <div className="col-md-auto">
        <button className="btn-login btn-primary" type="submit" disabled={isLoading}>
          <FontAwesomeIcon icon={faRightToBracket} />
          Login
        </button>
      </div>
    </div>
  );
}

export default ButtonLogin;
