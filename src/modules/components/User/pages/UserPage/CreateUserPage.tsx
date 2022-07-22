import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from 'configs/routes';
import { INewUser } from 'models/user';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { getErrorMessageResponse } from 'utils';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import CreateUserForm from './../../components/CreateUserForm/CreateUserForm';
import { API_PATHS } from './../../../../../configs/api';
import { replace } from 'connected-react-router';
import { DefaultLayout } from 'components/Layout';

function CreateUserPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values: INewUser) => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.usersCreate, 'post', values));

    setLoading(false);

    if (json?.success === RESPONSE_STATUS_SUCCESS) {
      alert('Successfully!');
      dispatch(replace(ROUTES.userManager));
      return;
    }

    if (json?.error) {
      setErrorMessage(getErrorMessageResponse(json));
    }
  };

  const handleBackToManagerUser = () => {
    history.push(ROUTES.userManager);
  };

  return (
    <DefaultLayout>
      <div className="content-body">
        <div>
          <button style={{ backgroundColor: '#1b1b38', borderStyle: 'none' }} onClick={() => handleBackToManagerUser()}>
            <FontAwesomeIcon style={{ width: '32px', height: '32px', color: 'white' }} icon={faCircleArrowLeft} />
          </button>
          <h4>Create profile</h4>
        </div>

        <CreateUserForm onSubmit={onSubmit} isLoading={isLoading} errorMessage={errorMessage} />
      </div>
    </DefaultLayout>
  );
}

export default CreateUserPage;
