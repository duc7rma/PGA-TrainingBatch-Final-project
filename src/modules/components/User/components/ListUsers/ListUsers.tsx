import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IUserList } from 'models/user';
import React from 'react';
import User from '../User/User';
import './ListUser.scss';

interface Props {
  currentItems: IUserList[];
}

function ListUsers(props: Props) {
  const { currentItems } = props;

  return (
    <div className="table-container">
      <table className="table-list">
        <thead>
          <tr className="tr-head">
            <th className="checkbox">
              <input type="checkbox"></input>
            </th>
            <th className="email">Login/Email</th>
            <th className="name">Name</th>
            <th className="accessLevel">Access level</th>
            <th className="product">Product</th>
            <th className="orders">Orders</th>
            <th className="wishList">Wishlist</th>
            <th className="created">Created</th>
            <th className="lastLogin">
              Last Login
              <FontAwesomeIcon icon={faArrowDownLong} />
            </th>
            <th className="delete"></th>
          </tr>
        </thead>

        <tbody>
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((user: IUserList, index) => <User key={index} user={user} />)}
        </tbody>
      </table>
    </div>
  );
}

export default ListUsers;
