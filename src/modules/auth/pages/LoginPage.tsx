import React from 'react';
import { useState } from 'react';
import LoginForm from 'modules/auth/components/LoginForm';
import { ILoginParams } from 'models/auth';
import { handleLoginAPI } from 'services/userServices';
import './LoginPage.css';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'modules/auth/redux/authReducer';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ROUTES } from 'configs/routes';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';

function LoginPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async (values: ILoginParams) => {
    setErrorMessage('');
    setLoading(true);
    const json = await handleLoginAPI(values.email, values.password);

    setLoading(false);

    if (json?.success === RESPONSE_STATUS_SUCCESS) {
      dispatch(setUserInfo(json.user));
      Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined });
      dispatch(replace(ROUTES.userManager));
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <LoginForm onLogin={onLogin} isLoading={isLoading} errorMessage={errorMessage} />
    </div>
  );
}

export default LoginPage;
