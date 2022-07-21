import { fetchThunk } from 'modules/common/redux/thunk';
import { clearUserIds } from 'modules/components/User/redux/userReducer';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import './ButtonRemoveUser.css';
import { API_PATHS } from './../../../../../configs/api';

function ButtonRemoveUser() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [isConfirmRemove, setIsConfirmRemove] = useState(false);

  const { listUsersRemove } = useSelector((state: AppState) => ({
    listUsersRemove: state.user.deleteIDs,
  }));

  console.log(listUsersRemove);

  const handleClickRemove = () => {
    setIsConfirmRemove(true);

    const removeUsers = async () => {
      const json = await dispatch(fetchThunk(API_PATHS.usersEdit, 'post', listUsersRemove));
      console.log(json.data);
    };
    const removeUsersResponse = removeUsers();

    dispatch(clearUserIds([]));
  };

  return (
    <div className="box-create-user">
      <div className="wrapper">
        <div className="col-md-auto">
          <button className="btn-create-user" type="submit" onClick={() => handleClickRemove()}>
            <span>
              <FormattedMessage id="removeUser" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonRemoveUser;
