import { faAngleDown, faAngleLeft, faTag, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Sidebar.scss';

function Sidebar() {
  const [isShowCatalog, setIsShowCatalog] = useState(false);
  const [isShowUser, setIsShowUser] = useState(false);

  return (
    <>
      <ul className="lists">
        <li className="list-sidebar catalog-sidebar" onClick={() => setIsShowCatalog(!isShowCatalog)}>
          <FontAwesomeIcon style={{ color: 'white', fontSize: '15px', marginRight: '6px' }} icon={faTag} />
          <a className="catalog">Catalog</a>
          <FontAwesomeIcon
            style={{ color: 'white', fontSize: '15px' }}
            icon={!isShowCatalog ? faAngleLeft : faAngleDown}
          />

          {isShowCatalog && (
            <ul style={{ color: 'white', fontSize: '15px' }}>
              <li>
                <a href="">Product List</a>
              </li>
            </ul>
          )}
        </li>

        <li className="list-sidebar user-sidebar" onClick={() => setIsShowUser(!isShowUser)}>
          <FontAwesomeIcon icon={faUsers} style={{ color: 'white', fontSize: '15px' }} />
          <a className="user">User</a>
          <FontAwesomeIcon
            style={{ color: 'white', fontSize: '15px' }}
            icon={!isShowUser ? faAngleLeft : faAngleDown}
          />

          {isShowUser && (
            <ul style={{ color: 'white', fontSize: '15px' }}>
              <li>
                <a href="">User List</a>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* <div className="list-sidebar catalog-sidebar">
        <FontAwesomeIcon style={{ color: 'white', fontSize: '15px' }} icon={faTag} />
        <a className="catalog" href="">
          Catalog
        </a>
        <FontAwesomeIcon style={{ color: 'white', fontSize: '15px' }} icon={faAngleLeft} />
      </div>

      <div className="list-sidebar user-sidebar">
        <FontAwesomeIcon icon={faUsers} style={{ color: 'white', fontSize: '15px' }} />
        <a className="user" href="">
          User
        </a>
        <FontAwesomeIcon style={{ color: 'white', fontSize: '15px' }} icon={faAngleLeft} />
      </div> */}
    </>
  );
}

export default Sidebar;
