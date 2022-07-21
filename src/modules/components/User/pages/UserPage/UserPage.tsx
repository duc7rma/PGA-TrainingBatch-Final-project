import React, { useState } from 'react';
import './UserPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'redux';
import FiltersUser from 'modules/components/User/components/FilterUser/FiltersUser';
// import PaginatedItems from 'modules/components/common/Pagination';
import { ROUTES } from 'configs/routes';
import { replace } from 'connected-react-router';
import PaginatedItems from 'modules/components/common/Pagination';
// import ButtonRemoveUser from 'modules/common/components/Buttons/ButtonRemoveUser/ButtonRemoveUser';
import { FormattedMessage } from 'react-intl';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { clearUserIds } from '../../redux/userReducer';
import { userRemove } from 'models/user';

function UserPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleAddUser = () => {
    dispatch(replace(ROUTES.userCreate));
  };

  const [isConfirmRemove, setIsConfirmRemove] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const { listUsersRemove } = useSelector((state: AppState) => ({
    listUsersRemove: state.user.deleteIDs,
  }));

  console.log(listUsersRemove);

  // {
  //   isConfirmRemove &&
  //     (window.onclick = function (e) {
  //       if (
  //         e.target != document.getElementById('confirm-delete') &&
  //         e.target != document.getElementById('btn-create-user')
  //       ) {
  //         setIsConfirmRemove(false);
  //       }
  //     });
  // }

  const handleClickNo = () => {
    setIsConfirmRemove(false);
    setIsDisable(false);
  };

  const handleClickRemove = () => {
    setIsConfirmRemove(true);
    setIsDisable(true);
  };

  const handleClickYes = () => {
    const removeUsers = async (listUsersRemove: { param: userRemove[] }) => {
      console.log(listUsersRemove);
      const json = await dispatch(fetchThunk(API_PATHS.usersEdit, 'post', listUsersRemove));
      console.log(json);
    };
    const removeUsersResponse = removeUsers(listUsersRemove);

    dispatch(clearUserIds([]));
    setIsConfirmRemove(false);
  };

  return (
    <div className="content-body">
      <FiltersUser />
      <button className="add-user" onClick={() => handleAddUser()}>
        Add User
      </button>

      {isConfirmRemove && (
        <div className="confirm-delete" id="confirm-delete">
          <div className="title">Confirm Delete</div>
          <div className="confirm">Do you want to delete this user?</div>
          <div className="yes-no">
            <button className="btn-yes" onClick={() => handleClickYes()}>
              <div className="yes">YES</div>
            </button>

            <button className="btn-no" onClick={() => handleClickNo()}>
              <div className="no">NO</div>
            </button>
          </div>
        </div>
      )}

      <PaginatedItems />

      {/* <ButtonRemoveUser /> */}
      <div className="box-create-user">
        <div className="wrapper">
          <div className="col-md-auto" id="btn-create-user">
            <button className="btn-create-user" type="submit" disabled={isDisable} onClick={() => handleClickRemove()}>
              <span>
                <FormattedMessage id="removeUser" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
