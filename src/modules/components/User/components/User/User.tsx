import React, { useState } from 'react';
import { IUserList } from 'models/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { deleteId, deleteUserIds } from '../../redux/userReducer';

interface Props {
  user: IUserList;
  key: number;
}

function User(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { user } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    !isChecked ? dispatch(deleteUserIds(e.target.value)) : dispatch(deleteId(e.target.value));
  };

  const handleClickButton = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {isChecked
        ? (document.getElementById(user.profile_id) as HTMLInputElement)?.setAttribute('style', 'opacity: 0.6')
        : (document.getElementById(user.profile_id) as HTMLInputElement)?.setAttribute('style', 'opacity: 1')}

      <tr className="tr-body" id={user.profile_id}>
        <td className="checkbox">
          <input
            type="checkbox"
            checked={isChecked}
            value={user.profile_id}
            onChange={(e) => handleClickCheckBox(e)}
          ></input>
        </td>
        <td className="email">
          <div className="email-name">
            <span className="email-user">
              <a href="">{user.vendor}</a>
              <p className="name-user">{user.storeName}</p>
            </span>
          </div>
        </td>
        <td className="name">
          <a href="">{user.fistName && user.lastName && `${user.fistName} ${user.lastName}`}</a>
        </td>
        <td className="accessLevel">{user.access_level}</td>
        <td className="product">
          <a href="">{user.product}</a>
        </td>
        <td className="orders">
          {user.order.order_as_buyer === 0 ? (
            <a style={{ color: 'white' }}>{user.order.order_as_buyer}</a>
          ) : (
            <a style={{ color: '#007BFF' }}>{user.order.order_as_buyer}</a>
          )}
        </td>
        <td className="wishList">
          <a style={{ color: '#007BFF' }}>{user.wishlist}</a>
        </td>
        <td className="created">{moment(+user.created).format('LLL')}</td>
        <td className="lastLogin">{moment(+user.last_login).format('LLL')}</td>
        <td className="delete">
          <button onClick={() => handleClickButton()}>
            <FontAwesomeIcon style={{ color: 'white', width: '1.2rem', height: '1.2rem' }} icon={faTrash} />
          </button>
        </td>
      </tr>
    </>
  );
}

export default User;
